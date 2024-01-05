package org.suika.mediashare.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.suika.mediashare.model.classes.Media;

@Service
public class MediaServiceImpl implements MediaService { 

    private Logger logger = LoggerFactory.getLogger(MediaServiceImpl.class);

    @Override
    public List<Media> findAllMedias() {
        String dir = "D:/Animes/Animes en cours/Jujutsu Kaisen";
        try (Stream<Path> stream = Files.list(Paths.get(dir))) {
            Set<String> test = stream.filter(file -> !Files.isDirectory(file))
                .map(Path::getFileName)
                .map(Path::toString)
                .collect(Collectors.toSet());

            System.out.println(test);
            
        }catch(Exception e){
            logger.error("An error occured while executing findAllMedias : {}", e.getLocalizedMessage());
        }

        return new ArrayList<>();
    }
}
