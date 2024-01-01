package org.suika.mediashare.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private Logger logger = LoggerFactory.getLogger(MediaController.class);

    @GetMapping
    public List<String> getAllMedias(){
        return new ArrayList<>(Arrays.asList("Anime", "Movie", "Show"));
    }

}
