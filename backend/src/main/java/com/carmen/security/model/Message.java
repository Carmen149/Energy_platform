package com.carmen.security.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.sql.Timestamp;

@Component
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = Message.class)
public class Message implements Serializable {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy HH:mm:ss")
    private Timestamp timeStamp;
    private Float measurementValue;
    private Long deviceId;
    public Message(){}
    public Message(Timestamp timeStamp, Float measurementValue, Long deviceId){
        this.timeStamp=timeStamp;
        this.measurementValue=measurementValue;
        this.deviceId=deviceId;
    }
}