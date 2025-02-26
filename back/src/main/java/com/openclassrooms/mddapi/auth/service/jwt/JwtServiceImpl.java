package com.openclassrooms.mddapi.auth.service.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.user.model.UserDetailsImpl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;

@Service
public class JwtServiceImpl implements JwtService {

    private final JwtEncoder jwtEncoder;

    public JwtServiceImpl(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @Override
    public String generateToken(Authentication authentication) {

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.DAYS))
                .subject(userDetails.getUsername())
                .claim("id", userDetails.getId())
                .claim("email", userDetails.getEmail())
                .claim("profileName", userDetails.getProfileName())
                .build();

        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(SignatureAlgorithm.RS512).build(),
                claims);

        return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
    }

    public String getTokenSubject(Authentication authentication) throws BadCredentialsException {

        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return jwt.getSubject();
        } catch (Exception e) {
            throw new BadCredentialsException("Error extracting subject from JWT", e);
        }

    }
}