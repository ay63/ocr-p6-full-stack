package com.openclassrooms.mddapi.subject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("subject")
public class SubjectController {

    public ResponseEntity<?> getAll() {

        

        return ResponseEntity.ok().build();
    }

}
