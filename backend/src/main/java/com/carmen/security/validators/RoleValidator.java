package com.carmen.security.validators;

import com.carmen.security.model.Role;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RoleValidator implements ConstraintValidator<RoleConstraint,String> {

    @Override
    public boolean isValid(String role, ConstraintValidatorContext constraintValidatorContext) {
        return role!=null && Role.covertStringToRole(role)!=null;
    }
}
