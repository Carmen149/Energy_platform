package com.carmen.security.controller;

import com.carmen.security.dto.AuthDto;
import com.carmen.security.dto.AuthentificationResponse;
import com.carmen.security.dto.LoginResponse;
import com.carmen.security.dto.UserDto;
import com.carmen.security.service.impl.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthentificationController {
    private final AuthenticationServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<AuthentificationResponse> register(
            @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(service.register(userDto));
    }

    @PutMapping("/log-in")
    public ResponseEntity<LoginResponse> register(
            @RequestBody AuthDto authDto
    ) {
        return ResponseEntity.ok(service.logIn(authDto));

    }
}
