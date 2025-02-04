package com.openclassrooms.mddapi.user.payload.response;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserResponse {

    @NotBlank
    private String email;

    @NotBlank
    private String profileName;

}