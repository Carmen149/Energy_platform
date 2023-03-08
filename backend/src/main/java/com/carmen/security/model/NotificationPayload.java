package com.carmen.security.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class NotificationPayload {
    private Long deviceId;
    private Long userId;
    private String message;
    public NotificationPayload(Long deviceId,Long userId,String message){
        this.deviceId=deviceId;
        this.message=message;
        this.userId=userId;
    }
    public NotificationPayload(){}
}
