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

import com.openclassrooms.mddapi.auth.dto.request.AuthLoginRequestDto;
import com.openclassrooms.mddapi.auth.dto.request.AuthRegistrationRequestDto;
import com.openclassrooms.mddapi.auth.dto.response.AuthResponse;
import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.share.dto.response.MessageResponse;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.model.UserDetailsImpl;
import com.openclassrooms.mddapi.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.MediaType;
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

    @Operation(description = "Login user", tags = { "Auth" }, security = {}, method = "POST")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON_VALUE, 
            schema = @Schema(implementation = AuthLoginRequestDto.class)
            ))
    @ApiResponses(value = {
            @ApiResponse(
                responseCode = "200", 
                description = "return token", 
                content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE, 
                    schema = @Schema(implementation = AuthResponse.class)
                    )),
            @ApiResponse(
                responseCode = "401", 
                description = "unauthorized",
                content = @Content()
            ),
            @ApiResponse(
                responseCode = "400", 
                description = "bad request",
                content = @Content()
            )
    })
    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthLoginRequestDto authLoginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authLoginRequestDto.getEmail(),
                        authLoginRequestDto.getPassword()));

        if (!authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).build();
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
        String token = jwtService.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(
                userDetailsImpl.getId(),
                userDetailsImpl.getEmail(),
                userDetailsImpl.getProfileName(),
                token));
    }

    @Operation(description = "Create user", tags = { "Auth" }, security = {}, method = "POST")
    @ApiResponses(value = {
            @ApiResponse(
                responseCode = "200", 
                description = "return token", 
                content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                     schema = @Schema(
                        implementation = MessageResponse.class)
                        )),
            @ApiResponse(
                responseCode = "400", 
                description = "Bad Request", 
                content = @Content()
            ),
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody AuthRegistrationRequestDto authRegistrationRequestDto) {
        if (userService.existsByEmail(authRegistrationRequestDto.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: email already exist !"));
        }

        User user = new User();
        user.setEmail(authRegistrationRequestDto.getEmail());
        user.setProfileName(authRegistrationRequestDto.getProfileName());
        user.setPassword(passwordEncoder.encode(authRegistrationRequestDto.getPassword()));

        userService.save(user);

        return ResponseEntity.ok(new MessageResponse("User created !"));
    }

}
