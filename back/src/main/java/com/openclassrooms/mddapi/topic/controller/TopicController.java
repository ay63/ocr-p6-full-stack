package com.openclassrooms.mddapi.topic.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.topic.dto.TopicDto;
import com.openclassrooms.mddapi.topic.mapper.TopicMapper;
import com.openclassrooms.mddapi.topic.service.TopicService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;


@RestController
@RequestMapping("topic")
public class TopicController {

    private final TopicService subjectService;
    private final TopicMapper subjectMapper;
    private final UserService userService;

    public TopicController(TopicService subjectService, TopicMapper subjectMapper, UserService userService) {
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<TopicDto>> getAll(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);
        List<TopicDto> subjectsDto = subjectMapper.toDtoList(subjectService.getAll(), user.getId());

        return ResponseEntity.ok().body(subjectsDto);
    }

}
