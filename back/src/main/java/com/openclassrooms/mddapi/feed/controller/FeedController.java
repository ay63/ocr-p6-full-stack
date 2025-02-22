package com.openclassrooms.mddapi.feed.controller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.feed.dto.response.FeedResponseDto;
import com.openclassrooms.mddapi.feed.service.FeedService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("feed")
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

     @Operation(
            description = "Get feed user",
            tags = {"Feed"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "return feed user",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                schema = @Schema(implementation = FeedResponseDto.class)
                        )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "unauthorized",
                    content = @Content()
            ),
    })
    @GetMapping
    public ResponseEntity<List<FeedResponseDto>> feed(Authentication authentication) {
        User user = userService.findByEmail(jwtService.getTokenSubject(authentication));

        if (user == null) {
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).build();
        }

        List<FeedResponseDto> feed = feedService.getFeedForUser(user.getId());

        return ResponseEntity.ok(feed);
    }

}
