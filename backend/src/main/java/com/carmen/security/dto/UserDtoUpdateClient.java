package com.carmen.security.dto;

import com.carmen.security.validators.NameConstraint;
import com.carmen.security.validators.PasswordConstraint;
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
public class UserDtoUpdateClient {
    @NotNull
    private Long id;
    @NameConstraint(message = "First name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String name;
    @PasswordConstraint(message = "Password is mandatory. It should contains at least 8 characters,one digit,one upper case alphabet,one lower case alphabet,one special character which includes \"!@#$%&*()-+=^\" and at most 20 characters. It doesn’t contain any white space.")
    private String password;
    @UserNameConstraint( message = "User name is mandatory. It should  contain at least 3 characters.")
    private String username;
    @RoleConstraint(message="Role is required. It must be client ot administrator.")
    private String role;
}
