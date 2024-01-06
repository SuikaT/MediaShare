package org.suika.mediashare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.suika.mediashare.services.AcquisitionService;

@Component
public class StartupManager {

    @Autowired
    AcquisitionService acquisitionService;

    @EventListener(ApplicationStartedEvent.class)
    public void runAfterStartup() {
        // Retrive and store all media from local files at startup
        acquisitionService.retrieveAllMedias();
    }
}
