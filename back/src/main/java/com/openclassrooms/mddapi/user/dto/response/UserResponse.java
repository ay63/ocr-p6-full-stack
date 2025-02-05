package com.openclassrooms.mddapi.user.dto.response;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class UserResponse {

    @NotBlank
    private String email;

    @NotBlank
    private String profileName;

}