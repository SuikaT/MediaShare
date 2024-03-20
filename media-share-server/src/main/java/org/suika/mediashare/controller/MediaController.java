package org.suika.mediashare.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.suika.mediashare.model.classes.Media;
import org.suika.mediashare.model.classes.MediaFile;
import org.suika.mediashare.model.enums.MediaTypeEnum;
import org.suika.mediashare.services.MediaService;

@RestController
@CrossOrigin
@RequestMapping("/api/")
public class MediaController {

    @Autowired
    MediaService mediaService;

    @GetMapping("medias")
    public Map<MediaTypeEnum, List<Media>> getAllMedias() {
        return mediaService.getMediaMap();
    }

    @GetMapping("mediasByType")
    public List<Media> getMediasByType(@RequestParam("mediaType") Integer mediaCode, @RequestParam("maxAmount") Integer maxAmount, @RequestParam("index") int index) {
        MediaTypeEnum mediaType = MediaTypeEnum.getEnum(mediaCode);

        return mediaService.getMediasByType(mediaType, maxAmount, index);
    }

    @GetMapping("mediaFile/{mediaType}/{mediaId}")
    public MediaFile getMediaFile(@PathVariable("mediaType") Integer mediaCode, @PathVariable("mediaId") Integer mediaId) {
        MediaTypeEnum mediaType = MediaTypeEnum.getEnum(mediaCode);

        return mediaService.getMediaFile(mediaType, mediaId);
    }

    @GetMapping("mediaFile/{mediaType}/{mediaId}/{seasonId}")
    public MediaFile getMediaFile(@PathVariable("mediaType") Integer mediaCode, @PathVariable("mediaId") Integer mediaId, @PathVariable("seasonId") Integer seasonId) {
        MediaTypeEnum mediaType = MediaTypeEnum.getEnum(mediaCode);

        return mediaService.getSeasonFile(mediaType, mediaId, seasonId);
    }

    @GetMapping("mediaFile/{mediaType}/{mediaId}/{seasonId}/{episodeId}")
    public MediaFile getMediaFile(@PathVariable("mediaType") Integer mediaCode, @PathVariable("mediaId") Integer mediaId, @PathVariable("seasonId") Integer seasonId,
            @PathVariable("episodeId") Integer episodeId) {
        MediaTypeEnum mediaType = MediaTypeEnum.getEnum(mediaCode);

        return mediaService.getEpisodeFile(mediaType, mediaId, seasonId, episodeId);
    }

}
