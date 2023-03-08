package com.carmen.security.dto;

import com.carmen.security.validators.NameConstraint;
import com.carmen.security.validators.PasswordConstraint;
import com.carmen.security.validators.RoleConstraint;
import com.carmen.security.validators.UserNameConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @NameConstraint(message = "First name is mandatory. It should start with a capital letter and contains at least 3 characters.")
    private String name;
    @RoleConstraint(message="Role is required. It must be client ot administrator.")
    private String role;
    @PasswordConstraint(message = "Password is mandatory. It should contains at least 8 characters,one digit,one upper case alphabet,one lower case alphabet,one special character which includes \"!@#$%&*()-+=^\" and at most 20 characters. It doesn’t contain any white space.")
    private String password;
    @UserNameConstraint(message = "User name is mandatory. It should  contain at least 3 characters.")
    private String username;

}
