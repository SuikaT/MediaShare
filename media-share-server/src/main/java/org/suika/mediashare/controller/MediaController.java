package org.suika.mediashare.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.suika.mediashare.model.classes.Media;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private Logger logger = LoggerFactory.getLogger(MediaController.class);

    @GetMapping
    public List<Media> getAllMedias() {
        return new ArrayList<>();
    }

}
