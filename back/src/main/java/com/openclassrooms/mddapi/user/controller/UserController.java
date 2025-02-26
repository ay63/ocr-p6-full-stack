package com.openclassrooms.mddapi.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.auth.dto.response.AuthResponse;
import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.user.dto.request.UserUpdateRequestDto;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.model.UserDetailsImpl;
import com.openclassrooms.mddapi.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

@RestController
@RequestMapping("user")
public class UserController {

    private UserService userService;
    private JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Operation(
        description = "Update user data",
        tags = {"User"},
        method = "PUT"
    )
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "200",
                description = "return new token with new user data",
                content = @Content(
                        mediaType = "application/json",
                        schema = @Schema(implementation = AuthResponse.class)
                )
        ),
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
    @PutMapping(path = "/update")
    public ResponseEntity<?> update(@Valid @RequestBody UserUpdateRequestDto userUpdateRequestDto,
            Authentication authentication) {

        if (authentication.isAuthenticated()) {
            User user = userService.findByEmail(jwtService.getTokenSubject(authentication));
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            User userUpdated = userService.update(user, userUpdateRequestDto);
            userService.save(userUpdated);

            UserDetailsImpl userDetails = new UserDetailsImpl(
                    userUpdated.getId(),
                    userUpdated.getProfileName(),
                    userUpdated.getEmail(),
                    userUpdated.getPassword());

            Authentication newAuth = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());
                    
        SecurityContextHolder.getContext().setAuthentication(newAuth);
           
        String token = jwtService.generateToken(newAuth);

            return ResponseEntity.ok(new AuthResponse(
                    userUpdated.getId(),
                    userUpdated.getEmail(),
                    userUpdated.getProfileName(),
                    token));
        }

        return ResponseEntity.badRequest().build();
    }

}
