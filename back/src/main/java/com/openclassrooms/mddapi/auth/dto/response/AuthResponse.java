package com.openclassrooms.mddapi.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private Long id;
    private String email;
    private String profileName;
    private String token;
}
