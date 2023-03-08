package com.carmen.security.validators;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Component
public class UserNameValidator implements ConstraintValidator<UserNameConstraint,String> {
    private static final String USERNAME_PATTERN = "^[a-zA-Z0-9\\\\._\\\\-]{3,}$";

    @Override
    public void initialize(UserNameConstraint userName) {
    }
    @Override
    public boolean isValid(String userName, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile(USERNAME_PATTERN );
        return userName!=null && pattern.matcher(userName).matches();
    }
}