package org.suika.mediashare;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class ApplicationProperties {

    @Value("${excluded.medias}")
    private List<String> excludedMedias;

    @Value("${directory.path.animes}")
    private List<String> animesDirectories;

    @Value("${directory.path.films}")
    private List<String> filmDirectories;

    @Value("${directory.path.series}")
    private List<String> seriesDirectories;

}
