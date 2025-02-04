package com.openclassrooms.mddapi.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.user.service.UserService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("user")
@Log4j2
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    //@todo 
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {


   
        return ResponseEntity.ok().body("userResponse");
    }


    
}
