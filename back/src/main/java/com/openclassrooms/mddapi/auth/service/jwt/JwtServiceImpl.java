package com.openclassrooms.mddapi.auth.service.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.user.service.user.UserDetailsImpl;

import lombok.extern.log4j.Log4j2;

import org.springframework.security.core.Authentication;

@Service
@Log4j2
public class JwtServiceImpl implements JwtService {

    private final JwtEncoder jwtEncoder;

    public JwtServiceImpl(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @Override
    public String generateToken(Authentication authentication) {

        Instant now = Instant.now();

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        log.info("AZERTY" + " " + userPrincipal.getUsername());

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.DAYS))
                .subject(userPrincipal.getUsername())
                .build();

        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(SignatureAlgorithm.RS512).build(),
                claims);

        return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
    }
}