package com.carmen.security.dto;

import com.carmen.security.validators.NameConstraint;
import com.carmen.security.validators.RoleConstraint;
import com.carmen.security.validators.UserNameConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDtoUpdateAdmin {
    @NotNull
    private Long id;
    @NameConstraint(message = "First name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String name;
    @UserNameConstraint( message = "User name is mandatory. It should  contain at least 3 characters.")
    private String username;
    @RoleConstraint(message="Role is required. It must be client ot administrator.")
    private String role;
}
