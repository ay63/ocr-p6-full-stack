package com.openclassrooms.mddapi.subscription.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.subscription.service.SubscriptionService;

@RestController
@RequestMapping("subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    private SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("subject/{subjectId}/user/{userId}")
    public ResponseEntity<?> subscribe(@PathVariable("subjectId") String subjectId,
            @PathVariable("userId") String userId) {

        try {
            subscriptionService.newSubscription(Long.parseLong(subjectId), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("subject/{subjectId}/user/{userId}")
    public ResponseEntity<?> delete(@PathVariable("subjectId") String subjectId,
            @PathVariable("userId") String userId) {

        try {
            subscriptionService.deleteSubscription(Long.parseLong(subjectId), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
