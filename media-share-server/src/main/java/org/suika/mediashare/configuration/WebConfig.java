package org.suika.mediashare.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.suika.mediashare.ApplicationProperties;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    ApplicationProperties appProperties;

    @Bean
    public WebMvcConfigurer corsConfig() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String origins = "http://" + appProperties.getIp() + ":" + appProperties.getClientPort();
                System.out.println(origins);
                registry.addMapping("/**").allowedOrigins(origins).allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.DELETE.name()).allowedHeaders(HttpHeaders.CONTENT_TYPE,
                        HttpHeaders.AUTHORIZATION);
            }
        };

    }
}
