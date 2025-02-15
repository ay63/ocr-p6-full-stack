package com.openclassrooms.mddapi.subject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.subject.dto.SubjectDto;
import com.openclassrooms.mddapi.subject.mapper.SubjectMapper;
import com.openclassrooms.mddapi.subject.service.SubjectService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("subject")
@Log4j2
public class SubjectController {

    private final SubjectService subjectService;
    private final SubjectMapper subjectMapper;
    private final UserService userService;

    public SubjectController(SubjectService subjectService, SubjectMapper subjectMapper, UserService userService) {
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<SubjectDto>> getAll(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);
        List<SubjectDto> subjectsDto = subjectMapper.toDtoList(subjectService.getAll(), user.getId());

        return ResponseEntity.ok().body(subjectsDto);
    }

}
