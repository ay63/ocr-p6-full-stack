package com.openclassrooms.mddapi.auth.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AuthLoginRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

}
