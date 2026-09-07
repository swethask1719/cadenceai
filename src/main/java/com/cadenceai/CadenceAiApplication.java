package com.cadenceai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;

import com.cadenceai.service.GeminiLiveService;
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class
})
public class CadenceAiApplication {

    public static void main(String[] args) throws InterruptedException {
       


            ConfigurableApplicationContext context =
                SpringApplication.run(CadenceAiApplication.class, args);

        GeminiLiveService geminiLiveService = context.getBean(GeminiLiveService.class);

        geminiLiveService.connect();
    }
}
