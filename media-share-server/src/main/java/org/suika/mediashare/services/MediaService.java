package org.suika.mediashare.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
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

    private Map<MediaTypeEnum, List<Media>> mediaMap = new HashMap<>();

    public List<Media> getMediasByType(MediaTypeEnum mediaType, Integer maxAmount, int index) {
        try {

            List<Media> mediaList = mediaMap.get(mediaType);
            if (mediaList == null)
                throw new IllegalArgumentException("mediaList is null");

            Integer size = mediaList.size();
            if (index >= size)
                throw new IllegalArgumentException("required index doesn't exist");

            Integer toIndex = index + maxAmount;
            if (toIndex > size)
                toIndex = maxAmount - (maxAmount - size);

            return mediaList.subList(index, toIndex);

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

        return mediaList.stream().filter(m -> m.getId() == mediaId).findFirst().orElse(null);
    }

    public Season getSeasonByTypeAndId(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId) {
        Media media = getMediaByTypeAndId(mediaType, mediaId);
        if (media == null)
            return null;

        return media.getSeasonList().stream().filter(s -> s.getId() == seasonId).findFirst().orElse(null);
    }

    public Episode getEpisodeByTypeAndId(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId, Integer episodeId) {
        Season season = getSeasonByTypeAndId(mediaType, mediaId, seasonId);
        if (season == null)
            return null;

        return season.getEpisodeList().stream().filter(e -> e.getId() == episodeId).findFirst().orElse(null);
    }

    public MediaFile getMediaFile(MediaTypeEnum mediaType, Integer mediaId) {
        Media media = getMediaByTypeAndId(mediaType, mediaId);

        if (media == null)
            return null;

        return new MediaFile(media.getName(), null);
    }

    public MediaFile getSeasonFile(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId) {
        Season season = getSeasonByTypeAndId(mediaType, mediaId, seasonId);

        if (season == null)
            return null;
        // TODO zip medias and send them
        return new MediaFile(season.getDirectoryName(), null);
    }

    public MediaFile getEpisodeFile(MediaTypeEnum mediaType, Integer mediaId, Integer seasonId, Integer episodeId) {
        Episode episode = getEpisodeByTypeAndId(mediaType, mediaId, seasonId, episodeId);

        if (episode == null)
            return null;

        return new MediaFile(episode.getName(), null);
    }
}
