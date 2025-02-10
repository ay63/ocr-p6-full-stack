package com.openclassrooms.mddapi.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthTokenResponse {

    private String token;
}
