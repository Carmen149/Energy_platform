package com.carmen.security.config;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    /***
     --create connection localhost
     private final static String USERNAME="guest";
     private final static String PASSWORD="guest";
     private final static String HOST="localhost";
     ***/

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    CachingConnectionFactory connectionFactory() {
        /***
         create connection localhost
         CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory(HOST);
         cachingConnectionFactory.setUsername(USERNAME);
         cachingConnectionFactory.setPassword(PASSWORD);
         ***/
        //create connection cloud
        String uri = "amqps://odzcucdw:K3C6BV6Xeszqq96sEc8Ym5VGvsHtG83a@cow.rmq2.cloudamqp.com/odzcucdw";
        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory();
        cachingConnectionFactory.setUri(uri);
        return cachingConnectionFactory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

}