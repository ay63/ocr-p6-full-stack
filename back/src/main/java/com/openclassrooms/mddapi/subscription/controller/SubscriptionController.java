package com.openclassrooms.mddapi.subscription.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("subscription")
public class SubscriptionController {

    @PostMapping
    public ResponseEntity<?> subscribe() {
        return ResponseEntity.ok().build();
    }
}
