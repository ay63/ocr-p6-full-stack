package com.openclassrooms.mddapi.subscription.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.subject.dto.SubjectDto;
import com.openclassrooms.mddapi.subject.mapper.SubjectMapper;
import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subscription.service.SubscriptionService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

@RestController
@RequestMapping("subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserService userService;
    private final SubjectMapper subjectMapper;

    public SubscriptionController(SubscriptionService subscriptionService, UserService userService,
            SubjectMapper subjectMapper) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
        this.subjectMapper = subjectMapper;
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
    public ResponseEntity<?> delete(
            @PathVariable("subjectId") String subjectId,
            @PathVariable("userId") String userId) {

        try {
            subscriptionService.deleteSubscription(Long.parseLong(subjectId), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("subscribed")
    public ResponseEntity<List<SubjectDto>> getAllSubscribeSubject(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);

        List<Subject> subs = subscriptionService.findAllSubscribeSubject(user.getId());
        List<SubjectDto> subjectsDto = subjectMapper.toDtoList(subs, user.getId());

        return ResponseEntity.ok().body(subjectsDto);
    }

}
