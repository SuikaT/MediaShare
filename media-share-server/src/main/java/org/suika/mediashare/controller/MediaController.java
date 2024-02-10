package org.suika.mediashare.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.model.enums.MediaTypeEnum;
import org.suika.mediashare.services.StoreService;

@RestController
@CrossOrigin
@RequestMapping("/api/")
public class MediaController {

    @Autowired
    StoreService storeService;

    @GetMapping("medias")
    public Map<MediaTypeEnum, List<Media>> getAllMedias() {
        return storeService.getMediaMap();
    }

    @GetMapping("medias/{type}")
    public List<Media> getMediasByType(@RequestParam("type") MediaTypeEnum mediaType) {
        return storeService.getMediasByType(mediaType);
    }

}
