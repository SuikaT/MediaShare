package org.suika.mediashare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.services.StoreService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    StoreService storeService;

    @GetMapping
    public List<Media> getAllMedias() {
        return storeService.getMediaList();
    }

}
