package com.openclassrooms.mddapi.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AuthLoginRequestDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

}
