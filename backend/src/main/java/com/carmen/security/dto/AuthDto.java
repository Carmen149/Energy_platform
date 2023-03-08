package com.carmen.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class AuthDto {
    private String username;
    private String password;

    public AuthDto(){}
    public AuthDto(String username, String password){
        this.username=username;
        this.password=password;
    }

}