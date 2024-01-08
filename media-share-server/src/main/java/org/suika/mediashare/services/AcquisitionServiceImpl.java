package org.suika.mediashare.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.suika.mediashare.ApplicationProperties;
import org.suika.mediashare.model.classes.Episode;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.model.classes.Season;
import org.suika.mediashare.model.enums.MediaTypeEnum;

@Service
public class AcquisitionServiceImpl implements AcquisitionService {

    private Logger logger = LoggerFactory.getLogger(AcquisitionServiceImpl.class);

    @Autowired
    ApplicationProperties appProperties;

    @Autowired
    StoreService storeService;

    @Override
    public void retrieveAllMedias() {

        Integer index = 0;
        List<Media> filmList = retrieveNotSeasonMedia(index);
        List<Media> seriesList = retrieveSeasonMedia(appProperties.getSeriesDirectories(), MediaTypeEnum.SERIES, index);
        List<Media> animeList = retrieveSeasonMedia(appProperties.getAnimesDirectories(), MediaTypeEnum.ANIME, index);
        List<Media> allMedias = Stream.concat(
                Stream.concat(
                        filmList.stream(),
                        seriesList.stream()),
                animeList.stream())
                .collect(Collectors.toList());

        storeService.addMedias(allMedias, true);

    }

    private List<Media> retrieveSeasonMedia(List<String> directoryList, MediaTypeEnum type, Integer index) {
        List<Media> mediaList = new ArrayList<>();

        for (String dir : directoryList) {
            List<Media> medias = findSeasonMedias(dir, type, index);
            mediaList.addAll(medias);
        }

        return mediaList;
    }

    private List<Media> retrieveNotSeasonMedia(Integer index) {
        List<String> filmDirList = appProperties.getFilmDirectories();
        List<Media> films = new ArrayList<>();
        for (String dir : filmDirList) {
            findDeepMedia(dir, films, MediaTypeEnum.MOVIE, index);
        }
        return films;
    }

    // @seasons behavior differs if searched medias can have seasons
    private List<Media> findSeasonMedias(String dir, MediaTypeEnum type, Integer index) {
        List<Media> mediaList = new ArrayList<>();
        try {
            List<File> files = getFiles(dir);
            for (File file : files) {
                if (file.isDirectory()) {
                    Media media = new Media(index, file.getName(), file.getAbsolutePath(), type, file.getTotalSpace());
                    findSeasons(media);
                    mediaList.add(media);
                    index++;
                }
            }
        } catch (Exception e) {
            logger.error("An error occured while executing findMedias : {}", e.getLocalizedMessage());
        }

        return mediaList;
    }

    private List<File> getFiles(String dir) {
        try {
            return Files.list(Paths.get(dir)).map(Path::toFile).toList();
        } catch (IOException e) {
            logger.error("[AcquisitionService] An error occured while executing getFiles: ", e.getLocalizedMessage());
        }
        return new ArrayList<>();
    }

    // Retrieve all media from the given directory and all its subdirectories
    private void findDeepMedia(String dir, List<Media> medias, MediaTypeEnum type, Integer index) {
        for (File file : getFiles(dir)) {
            if (file.isDirectory()) {
                findDeepMedia(file.getAbsolutePath(), medias, type, index);
            } else {
                Media media = new Media(index, file.getName(), file.getAbsolutePath(), type, file.getTotalSpace());
                medias.add(media);
                index++;
            }
        }
    }

    private void findSeasons(Media media) {
        List<Season> seasonList = new ArrayList<>();
        List<Episode> episodeList = new ArrayList<>();
        List<File> fileList = getFiles(media.getPath());
        Integer index = 0;
        for (File file : fileList) {
            // if it's a directory we can assume that each directory is a season
            if (file.isDirectory()) {
                Season season = new Season(index, file.getName(), file.getAbsolutePath(), file.getTotalSpace());
                findEpisodes(season);
                if (season.getEpisodeList() != null && !season.getEpisodeList().isEmpty()) {
                    seasonList.add(season);
                    index++;
                }
            } else {
                // On file case directly create an episode of it
                Episode episode = new Episode(index, file.getName(), file.getAbsolutePath(), file.getTotalSpace());
                episodeList.add(episode);
                index++;
            }
        }
        // Not empty mean than media has only one season and without dedicated directory
        if (!episodeList.isEmpty() && seasonList.isEmpty()) {
            Season season = new Season(0, false);
            season.setEpisodeList(episodeList);
            seasonList.add(season);
        }

        media.setSeasonList(seasonList);
    }

    private void findEpisodes(Season season) {
        List<Episode> episodeList = new ArrayList<>();
        List<File> fileList = getFiles(season.getPath());
        Integer index = 0;
        for (File file : fileList) {
            // if it's a directory we can assume that each directory is a season
            if (!file.isDirectory()) {
                episodeList.add(new Episode(index, file.getName(), file.getAbsolutePath(), file.getTotalSpace()));
                index++;
            }
        }

        season.setEpisodeList(episodeList);
    }
}