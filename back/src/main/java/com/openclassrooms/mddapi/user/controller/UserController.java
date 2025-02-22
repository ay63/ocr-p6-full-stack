package com.openclassrooms.mddapi.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.auth.dto.response.AuthResponse;
import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.user.dto.request.UserUpdateRequestDto;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserDetailsImpl;
import com.openclassrooms.mddapi.user.service.UserService;

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
                    user.getId(),
                    user.getProfileName(),
                    user.getEmail(),
                    user.getPassword());

            Authentication newAuth = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());

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
