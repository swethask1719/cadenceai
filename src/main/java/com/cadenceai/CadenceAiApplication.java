package com.cadenceai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;

import com.cadenceai.initiallearn.Chatbot;
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class
})
public class CadenceAiApplication {

    public static void main(String[] args) {
       


            ConfigurableApplicationContext context =
                SpringApplication.run(CadenceAiApplication.class, args);

        Chatbot chatbot = context.getBean(Chatbot.class);

        chatbot.initialize();
    }
}
