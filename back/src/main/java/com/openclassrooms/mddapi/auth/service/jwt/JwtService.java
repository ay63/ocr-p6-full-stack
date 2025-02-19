package com.openclassrooms.mddapi.auth.service.jwt;

import org.springframework.security.core.Authentication;

public interface JwtService {

    String generateToken(Authentication authentication);
}