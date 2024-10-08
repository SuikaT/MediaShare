package org.suika.mediashare.services;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ResponseStatusException;
import org.suika.mediashare.model.classes.Episode;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.model.classes.MediaFile;
import org.suika.mediashare.model.classes.Season;
import org.suika.mediashare.model.enums.MediaTypeEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@Scope("singleton")
public class MediaService {

    private Logger logger = LoggerFactory.getLogger(MediaService.class);

    private Map<MediaTypeEnum, List<Media>> mediaMap = new HashMap<>();

    public List<Media> getMediasByType(MediaTypeEnum mediaType) {
        try {

            List<Media> mediaList = mediaMap.get(mediaType);
            if (mediaList == null)
                throw new IllegalArgumentException("mediaList is null");

            return mediaList;

        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public boolean addMedia(Media media) {
        if (media == null)
            return false;

        if (!mediaMap.containsKey(media.getType()))
            mediaMap.put(media.getType(), new ArrayList<>());

        return mediaMap.get(media.getType()).add(media);
    }

    public boolean addMedias(List<Media> medias) {
        if (medias == null || medias.isEmpty())
            return false;

        for (Media media : medias) {
            addMedia(media);
        }

        return true;
    }

    public void clearMediaList() {
        mediaMap.clear();
    }

    public Media getMediaByTypeAndId(MediaTypeEnum mediaType, Integer mediaId) {
        List<Media> mediaList = mediaMap.get(mediaType);
        if (mediaList == null)
            return null;

        return mediaList.stream().filter(m -> Objects.equals(m.getId(), mediaId)).findFirst().orElse(null);
    }

    public Season getSeasonByTypeAndId(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId) {
        Media media = getMediaByTypeAndId(mediaType, mediaId);
        if (media == null)
            return null;

        return media.getSeasonList().stream().filter(s -> Objects.equals(s.getId(), seasonId)).findFirst().orElse(null);
    }

    public Episode getEpisodeByTypeAndId(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId, Integer episodeId) {
        Season season = getSeasonByTypeAndId(mediaType, mediaId, seasonId);
        if (season == null)
            return null;

        return season.getEpisodeList().stream().filter(e -> Objects.equals(e.getId(), episodeId)).findFirst().orElse(null);
    }

    public List<MediaFile> getMediaFile(MediaTypeEnum mediaType, Integer mediaId) throws IOException, NullPointerException {
        Media media = getMediaByTypeAndId(mediaType, mediaId);
        List<MediaFile> mediaFiles = new ArrayList<>();

        if (media == null)
            return new ArrayList<>();

        // if media doesn't have season return the file directly
        if (CollectionUtils.isEmpty(media.getSeasonList())) {
            MediaFile mediaFile = buildMediaFile(media);
            mediaFiles.add(mediaFile);
        } else {
            for (Season season : media.getSeasonList()) {
                if (!CollectionUtils.isEmpty(season.getEpisodeList())) {
                    for (Episode episode : season.getEpisodeList()) {
                        MediaFile episodeFile = buildEpisodeFile(episode);
                        mediaFiles.add(episodeFile);
                    }
                }
            }
        }
        return mediaFiles;
    }

    private MediaFile buildMediaFile(Media media) {
        MediaFile mediaFile = new MediaFile(media.getName());
        FileSystemResource file = new FileSystemResource(media.getPath());
        mediaFile.setFile(file);

        return mediaFile;
    }

    private MediaFile buildEpisodeFile(Episode episode) {
        MediaFile mediaFile = new MediaFile(episode.getName());
        FileSystemResource file = new FileSystemResource(episode.getPath());
        mediaFile.setFile(file);

        return mediaFile;
    }

    private byte[] zipMedia(Media media) {
        ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();
        try (ZipOutputStream zipOut = new ZipOutputStream(byteArrayOut)) {
            // add directory to zip
            zipOut.putNextEntry(new ZipEntry(media.getPath()));
            zipOut.closeEntry();
            // zip each seasons
            for (Season season : media.getSeasonList()) {
                zipSeason(season, zipOut);
            }
        } catch (IOException e) {
            logger.error("An error occured while executing zipFiles : {}", e.getMessage());
        }

        return byteArrayOut.toByteArray();
    }

    private void zipSeason(Season season, ZipOutputStream zipOut) throws IOException {
        // add season directory to zip if not null
        // if its null it's a fictive directory to wrap episodes when only one season exist
        if (season.getPath() != null) {
            zipOut.putNextEntry(new ZipEntry(season.getPath()));
            zipOut.closeEntry();
        }

        for (Episode episode : season.getEpisodeList()) {
            File file = new File(episode.getPath());
            addFileToZip(file, zipOut);
        }

    }

    private void addFileToZip(File file, ZipOutputStream zipOut) {
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            ZipEntry zipEntry = new ZipEntry(file.getName());
            zipOut.putNextEntry(zipEntry);

            byte[] bytes = new byte[1024];
            int length;
            while ((length = fileInputStream.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
        } catch (IOException e) {
            logger.error("An error occured while executing addFileToZip : {}", e.getMessage());
        }
    }

    public MediaFile getSeasonFile(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId) {
        Season season = getSeasonByTypeAndId(mediaType, mediaId, seasonId);

        if (season == null)
            return null;

        return new MediaFile(season.getDirectoryName(), null);
    }

    public MediaFile getEpisodeFile(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId, Integer episodeId) throws ResponseStatusException {
        Episode episode = getEpisodeByTypeAndId(mediaType, mediaId, seasonId, episodeId);

        if (episode == null) {
            logger.error("getEpisodeFile() => episode is null for mediaType = {}, mediaId = {}, seasonId = {}, episodeId = {}", mediaType, mediaId, seasonId, episodeId);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video file not found");
        }

        File file = new File(episode.getPath());

        if (!file.exists()) {
            logger.error("getEpisodeFile() => file doesn't exist fir mediaType = {}, mediaId = {}, seasonId = {}, episodeId = {}, path = {}", mediaType, mediaId, seasonId, episodeId,
                    episode.getPath());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video file not found");
        }

        return new MediaFile(episode.getName(), new FileSystemResource(file));
    }

    public List<Media> searchMedias(String searchKey) {
        // allMedias as one list
        List<Media> allMedias = mediaMap.values().stream().flatMap(Collection::stream).collect(Collectors.toList());
        // search for name containing the search Key
        return allMedias.stream().filter(media -> StringUtils.containsIgnoreCase(media.getName(), searchKey)).toList();
    }
}
