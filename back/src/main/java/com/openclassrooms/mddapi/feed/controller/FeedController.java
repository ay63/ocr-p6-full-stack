package com.openclassrooms.mddapi.feed.controller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.feed.dto.response.FeedResponseDto;
import com.openclassrooms.mddapi.feed.service.FeedService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("feed")
@Log4j2
public class FeedController {

    private final UserService userService;
    private final FeedService feedService;
    private final JwtService jwtService;

    public FeedController(
            UserService userService,
            FeedService feedService,
            JwtService jwtService) {
        this.userService = userService;
        this.feedService = feedService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<?> feed(Authentication authentication) {
        User user = userService.findByEmail(jwtService.getTokenSubject(authentication));
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).build();
        }

        List<FeedResponseDto> feed = feedService.getFeedForUser(user.getId());

        return ResponseEntity.ok(feed);
    }

}
