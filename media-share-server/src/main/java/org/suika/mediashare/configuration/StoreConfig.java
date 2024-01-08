package org.suika.mediashare.configuration;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.suika.mediashare.services.StoreService;

@Configuration
public class StoreConfig {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public StoreService storeInstance() {
        return new StoreService();
    }

}
