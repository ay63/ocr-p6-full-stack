package com.openclassrooms.mddapi.auth.dto.request;

import com.openclassrooms.mddapi.auth.validator.password.isValidPassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthRegistrationRequestDto {

    @NotBlank
    private String profileName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @isValidPassword
    private String password;


}
