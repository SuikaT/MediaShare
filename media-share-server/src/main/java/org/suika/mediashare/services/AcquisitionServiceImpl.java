package org.suika.mediashare.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public void retrieveAllMedias() {
        System.err.println(appProperties.getAnimesDirectories());

        List<Media> filmList = retrieveFilms();

        List<Media> seriesList = retrieveSeasonMedia(appProperties.getSeriesDirectories(), MediaTypeEnum.SERIES);

        List<Media> animeList = retrieveSeasonMedia(appProperties.getAnimesDirectories(), MediaTypeEnum.ANIME);
        System.out.println(animeList);
    }

    private List<Media> retrieveSeasonMedia(List<String> directoryList, MediaTypeEnum type) {
        List<Media> mediaList = new ArrayList<>();

        for (String dir : directoryList) {
            List<Media> medias = findSeasonMedias(dir, type);
            mediaList.addAll(medias);
        }

        return mediaList;
    }

    private List<Media> retrieveFilms() {
        List<String> filmDirList = appProperties.getFilmDirectories();
        List<Media> films = new ArrayList<>();
        for (String dir : filmDirList) {
            findDeepMedia(dir, films, MediaTypeEnum.MOVIE);
        }
        return films;
    }

    // @seasons behavior differs if searched medias can have seasons
    private List<Media> findSeasonMedias(String dir, MediaTypeEnum type) {
        List<Media> mediaList = new ArrayList<>();
        try {
            List<File> files = getFiles(dir);
            for (File file : files) {
                if (file.isDirectory()) {
                    Media media = new Media(file.getName(), file.getAbsolutePath(), type, file.getTotalSpace());
                    findSeasons(media);
                    mediaList.add(media);
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
    private void findDeepMedia(String dir, List<Media> medias, MediaTypeEnum type) {
        for (File file : getFiles(dir)) {
            if (file.isDirectory()) {
                findDeepMedia(file.getAbsolutePath(), medias, type);
            } else {
                Media media = new Media(file.getName(), file.getAbsolutePath(), type, file.getTotalSpace());
                medias.add(media);
            }
        }
    }

    private void findSeasons(Media media) {
        List<Season> seasonList = new ArrayList<>();
        List<Episode> episodeList = new ArrayList<>();
        List<File> fileList = getFiles(media.getPath());

        for (File file : fileList) {
            // if it's a directory we can assume that each directory is a season
            if (file.isDirectory()) {
                Season season = new Season(file.getName(), file.getAbsolutePath(), file.getTotalSpace());
                findEpisodes(season);
                if (season.getEpisodeList() != null && !season.getEpisodeList().isEmpty()) {
                    seasonList.add(season);
                }
            } else {
                // On file case directly create an episode of it
                Episode episode = new Episode(file.getName(), file.getAbsolutePath(), file.getTotalSpace());
                episodeList.add(episode);
            }
        }
        // Not empty mean than media has only one season and without dedicated directory
        if (!episodeList.isEmpty()) {
            Season season = new Season();
            season.setEpisodeList(episodeList);
            seasonList.add(season);
        }

        media.setSeasonList(seasonList);
    }

    private void findEpisodes(Season season) {
        List<Episode> episodeList = new ArrayList<>();
        List<File> fileList = getFiles(season.getPath());
        for (File file : fileList) {
            // if it's a directory we can assume that each directory is a season
            if (!file.isDirectory()) {
                episodeList.add(new Episode(file.getName(), file.getAbsolutePath(), file.getTotalSpace()));
            }
        }

        season.setEpisodeList(episodeList);
    }
}