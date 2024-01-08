package org.suika.mediashare.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.suika.mediashare.model.classes.Media;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@Scope("singleton")
public class StoreService {

    private List<Media> mediaList = new ArrayList<>();

    public boolean addMedia(Media media) {
        if (media != null) {
            return mediaList.add(media);
        }

        return false;
    }

    public boolean addMedias(List<Media> medias) {
        if (medias != null && !medias.isEmpty()) {
            return mediaList.addAll(medias);
        }

        return false;
    }

    public boolean addMedias(List<Media> medias, boolean reset) {
        if (reset)
            clearMediaList();

        if (medias != null && !medias.isEmpty()) {
            return mediaList.addAll(medias);
        }

        return false;
    }

    public void clearMediaList() {
        mediaList.clear();
    }
}
