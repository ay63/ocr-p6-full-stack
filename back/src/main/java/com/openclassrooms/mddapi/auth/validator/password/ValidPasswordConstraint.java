package com.openclassrooms.mddapi.auth.validator.password;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidPasswordConstraint implements ConstraintValidator<isValidPassword, String> {
    @Override
    public void initialize(isValidPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {

        if (s == null)
            return false;

        return (s.length() >= 8 &&
                s.matches(".*[0-9].*") &&
                s.matches(".*[A-Z].*") &&
                s.matches(".*[!@#$%^&*()_+={}\\[\\]:;<>,.?/~\\\\|-].*"));
    }
}
