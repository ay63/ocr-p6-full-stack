package com.openclassrooms.mddapi.subject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.subject.dto.SubjectDto;
import com.openclassrooms.mddapi.subject.mapper.SubjectMapper;
import com.openclassrooms.mddapi.subject.service.SubjectService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("subject")
@Log4j2
public class SubjectController {

    private final SubjectService subjectService;
    private final SubjectMapper subjectMapper;

    public SubjectController(SubjectService subjectService, SubjectMapper subjectMapper) {
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;

    }

    @GetMapping
    public ResponseEntity<List<SubjectDto>> getAll() {

        List<SubjectDto> subjectsDto = subjectMapper.toDto(subjectService.getAll());

        return ResponseEntity.ok().body(subjectsDto);
    }

}
