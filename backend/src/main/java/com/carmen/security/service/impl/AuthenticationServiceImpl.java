package com.carmen.security.service.impl;

import com.carmen.security.config.JwtService;
import com.carmen.security.dto.AuthDto;
import com.carmen.security.dto.AuthentificationResponse;
import com.carmen.security.dto.LoginResponse;
import com.carmen.security.dto.UserDto;
import com.carmen.security.model.Role;
import com.carmen.security.model.User;
import com.carmen.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthentificationResponse register(UserDto userDto) {
        User user= User.builder()
                .name(userDto.getName())
                .role(Role.covertStringToRole(userDto.getRole()))
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
        userRepository.save(user);
        var jwtToken=jwtService.generateToken(user);
        return AuthentificationResponse.builder().token(jwtToken).build();
    }

    public LoginResponse logIn(AuthDto authDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authDto.getUsername(),
                        authDto.getPassword()

                )
        );
        var user= userRepository.findByUsername(authDto.getUsername()).orElseThrow();
        var jwtToken=jwtService.generateToken(user);
        return LoginResponse.builder().
        username(user.getUsername()).role(user.getRole()).id(user.getId()).token(jwtToken).build();
    }
}
