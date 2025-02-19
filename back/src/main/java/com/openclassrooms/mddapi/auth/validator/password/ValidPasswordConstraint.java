package com.openclassrooms.mddapi.auth.validator.password;

import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ValidPasswordConstraint implements ConstraintValidator<isValidPassword, String> {

    @Override
    public void initialize(isValidPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {

        if (s == null)
            return false;

        return s.matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+={}\\[\\]:;<>,.?/~\\\\|-]).{8,64}$");
    }
}
