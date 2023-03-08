package com.carmen.security.dto;

import com.carmen.security.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class UserResponse {
    private Long id;
    private String name;
    private Role role;
    private String username;

}
