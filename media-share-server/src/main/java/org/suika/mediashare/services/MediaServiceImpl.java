package org.suika.mediashare.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.suika.mediashare.ApplicationProperties;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.model.classes.Series;
import org.suika.mediashare.model.enums.MediaTypeEnum;

@Service
public class MediaServiceImpl implements MediaService {

    private Logger logger = LoggerFactory.getLogger(MediaServiceImpl.class);

    @Autowired
    ApplicationProperties appProperties;

    @Override
    public List<Media> findAllMedias() {
        System.out.println(appProperties.getExcludedMedias());
        String dir = "";

        try (Stream<Path> stream = Files.list(Paths.get(dir))) {
            return stream.filter(file -> !Files.isDirectory(file))
                    .map(path -> (Media) new Series(path.getFileName().toString(), path.toAbsolutePath().toString(),
                            new ArrayList<>(), MediaTypeEnum.ANIME))
                    .toList();

        } catch (Exception e) {
            logger.error("An error occured while executing findAllMedias : {}", e.getLocalizedMessage());
        }

        return new ArrayList<>();
    }
}
