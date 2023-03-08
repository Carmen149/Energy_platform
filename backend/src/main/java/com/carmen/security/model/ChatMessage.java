package com.carmen.security.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessage {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Stautus status;
}
