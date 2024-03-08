package org.suika.mediashare.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.model.enums.MediaTypeEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@Scope("singleton")
public class StoreService {

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
}
