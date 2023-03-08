package com.carmen.security.controller;

import com.carmen.security.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    public ChatController(SimpMessagingTemplate simpMessagingTemplate){
        this.simpMessagingTemplate=simpMessagingTemplate;
    }
    @MessageMapping("/message") // app/message
    @SendTo("/chatroom/public")
    private ChatMessage receivePublicMessage(@Payload ChatMessage message){
        return message;
    }
    @MessageMapping("/private-message")
    public ChatMessage receiverPrivateMessage(@Payload ChatMessage message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message); //user//David/private
        return message;
    }
    @MessageMapping("/private-seen")
    public ChatMessage seen(@Payload ChatMessage message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/seen",message);
        return message;
    }
    @MessageMapping("/private-typing")
    public ChatMessage typing(@Payload ChatMessage message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/typing",message);
        return message;
    }
}
