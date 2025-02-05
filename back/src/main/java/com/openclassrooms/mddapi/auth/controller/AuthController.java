package com.openclassrooms.mddapi.auth.controller;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;

import com.openclassrooms.mddapi.auth.payload.request.AuthLoginRequest;
import com.openclassrooms.mddapi.auth.payload.request.AuthRegistrationRequest;
import com.openclassrooms.mddapi.auth.payload.response.AuthTokenResponse;
import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.share.dto.response.MessageResponse;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.user.UserService;

import jakarta.validation.Valid;

@RestController()
@RequestMapping("auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthLoginRequest authLoginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authLoginRequest.getEmail(),
                        authLoginRequest.getPassword()));

        if (!authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).build();
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtService.generateToken(authentication);

        return ResponseEntity.ok(new AuthTokenResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody AuthRegistrationRequest authRegistrationRequest) {
        if (userService.existsByEmail(authRegistrationRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: email already exist !"));
        }

        User user = new User();
        user.setEmail(authRegistrationRequest.getEmail());
        user.setProfileName(authRegistrationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authRegistrationRequest.getPassword()));

        userService.save(user);

        return ResponseEntity.ok(new MessageResponse("User created !"));
    }

}
