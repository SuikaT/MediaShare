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

    public List<Media> getMediasByType(MediaTypeEnum mediaType) {
        return mediaMap.get(mediaType);
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
