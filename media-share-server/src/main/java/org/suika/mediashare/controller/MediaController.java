package org.suika.mediashare.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    private Logger logger = LoggerFactory.getLogger(MediaController.class);

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

    @GetMapping("mediaFile/{mediaType}/{mediaId}/{seasonId}/{episodeId}")
    public ResponseEntity<Resource> getMediaFile(@PathVariable("mediaType") Integer mediaCode, @PathVariable("mediaId") Integer mediaId, @PathVariable("seasonId") Integer seasonId,
            @PathVariable("episodeId") Integer episodeId) {

        MediaTypeEnum mediaType = MediaTypeEnum.getEnum(mediaCode);

        MediaFile mediaFile = mediaService.getEpisodeFile(mediaType, mediaId, seasonId, episodeId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", mediaFile.getFileName());
        headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);

        return ResponseEntity.ok().headers(headers).body(mediaFile.getFile());
    }

    @GetMapping("mediaFile/{mediaType}/{mediaId}")
    public ResponseEntity<Resource> getMediaFile(@PathVariable("mediaType") Integer mediaCode, @PathVariable("mediaId") Integer mediaId) {
        MediaTypeEnum mediaType = MediaTypeEnum.getEnum(mediaCode);

        List<MediaFile> mediaFiles;
        try {
            mediaFiles = mediaService.getMediaFile(mediaType, mediaId);
            // we should only retrieve one element, if we got more it means its not a movie
            if (mediaFiles != null && mediaFiles.size() == 1) {
                MediaFile mediaFile = mediaFiles.get(0);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", mediaFile.getFileName());
                headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);

                return ResponseEntity.ok().headers(headers).body(mediaFile.getFile());
            }
        } catch (IOException e) {
            logger.error("An error occured while executing getMovieFile: {}", e.getMessage());
        }

        return null;
    }
}
