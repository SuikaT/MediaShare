package org.suika.mediashare;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.suika.mediashare.model.enums.MediaTypeEnum;

import lombok.Getter;

@Getter
@Component
public class ApplicationProperties {

    @Value("${excluded.medias}")
    private List<String> excludedMedias;

    @Value("${directory.path.animes}")
    private List<String> animesDirectories;

    @Value("${directory.path.films}")
    private List<String> moviesDirectories;

    @Value("${directory.path.series}")
    private List<String> showsDirectories;

    public List<String> getDirectories(MediaTypeEnum mediaType) {
        switch (mediaType) {
            case ANIME:
                return animesDirectories;
            case SHOW:
                return showsDirectories;
            case MOVIE:
                return moviesDirectories;
            default:
                return new ArrayList<>();
        }
    }

}
