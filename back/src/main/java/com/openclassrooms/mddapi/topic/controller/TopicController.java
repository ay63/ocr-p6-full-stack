package com.openclassrooms.mddapi.topic.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.topic.dto.TopicDto;
import com.openclassrooms.mddapi.topic.mapper.TopicMapper;
import com.openclassrooms.mddapi.topic.service.TopicService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("topic")
public class TopicController {

    private final TopicService subjectService;
    private final TopicMapper subjectMapper;
    private final UserService userService;
    private final JwtService jwtService;

    public TopicController(TopicService subjectService,
            TopicMapper subjectMapper,
            UserService userService,
            JwtService jwtService) {
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;
        this.userService = userService;
        this.jwtService = jwtService;
    }

       @Operation(
        description = "Get topics",
        tags = {"Topics"},
        method = "GET"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "return topic list",
                    content = @Content(
                            mediaType = "application/json",
                           array = @ArraySchema(
                                schema = @Schema(implementation = TopicDto.class)
                        )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "unauthorized",
                    content = @Content()
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Bad request",
                content = @Content()
        )
    })
    @GetMapping
    public ResponseEntity<List<TopicDto>> getAll(Authentication authentication) {
        User user = userService.findByEmail(jwtService.getTokenSubject(authentication));
        List<TopicDto> subjectsDto = subjectMapper.toDtoList(subjectService.getAll(), user.getId());

        return ResponseEntity.ok().body(subjectsDto);
    }

}
