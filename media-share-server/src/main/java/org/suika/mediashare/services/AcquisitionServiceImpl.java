package org.suika.mediashare.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.suika.mediashare.ApplicationProperties;

@Service
public class AcquisitionServiceImpl implements AcquisitionService {

    @Autowired
    ApplicationProperties appProperties;

    @Override
    public void retrieveAllMedias() {
        System.err.println(appProperties.getAnimesDirectories());
    }

}
