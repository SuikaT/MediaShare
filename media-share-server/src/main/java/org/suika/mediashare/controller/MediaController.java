package org.suika.mediashare.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.services.StoreService;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private Logger logger = LoggerFactory.getLogger(MediaController.class);

    @Autowired
    StoreService storeService;

    @GetMapping
    public List<Media> getAllMedias() {
        return storeService.getMediaList();
    }

}
