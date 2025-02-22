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

import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.subscription.service.SubscriptionService;
import com.openclassrooms.mddapi.topic.dto.TopicDto;
import com.openclassrooms.mddapi.topic.mapper.TopicMapper;
import com.openclassrooms.mddapi.topic.model.Topic;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

@RestController
@RequestMapping("subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserService userService;
    private final TopicMapper subjectMapper;
    private final JwtService jwtService;

    public SubscriptionController(SubscriptionService subscriptionService,
            UserService userService,
            TopicMapper subjectMapper,
            JwtService jwtService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
        this.subjectMapper = subjectMapper;
        this.jwtService = jwtService;
    }

    @PostMapping("topic/{subjectId}/user/{userId}")
    public ResponseEntity<?> subscribe(@PathVariable("subjectId") String subjectId,
            @PathVariable("userId") String userId) {

        try {
            subscriptionService.newSubscription(Long.parseLong(subjectId), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("topic/{subjectId}/user/{userId}")
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
    public ResponseEntity<List<TopicDto>> getAllSubscribeSubject(Authentication authentication) {
        User user = userService.findByEmail(jwtService.getTokenSubject(authentication));

        List<Topic> topics = subscriptionService.findAllSubscribeSubject(user.getId());
        List<TopicDto> topicDtos = subjectMapper.toDtoList(topics, user.getId());

        return ResponseEntity.ok().body(topicDtos);
    }

}
