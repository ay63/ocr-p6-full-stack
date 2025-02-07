package com.openclassrooms.mddapi.auth.validator.password;

import com.nimbusds.jose.Payload;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ValidPasswordConstraint.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface isValidPassword {

    String message() default "Password must at least have: 8 character long, one majuscule and one number";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
