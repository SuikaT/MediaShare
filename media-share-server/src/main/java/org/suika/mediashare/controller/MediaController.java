package org.suika.mediashare.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.suika.mediashare.services.MediaService;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private Logger logger = LoggerFactory.getLogger(MediaController.class);

    @Autowired
    private MediaService mediaService;

    @GetMapping
    public List<String> getAllMedias(){
        mediaService.findAllMedias();
        return new ArrayList<>(Arrays.asList("Anime", "Movie", "test"));
    }

}
