package com.openclassrooms.mddapi.subject.service;

import java.util.List;

import com.openclassrooms.mddapi.subject.model.Subject;

public interface SubjectService {

    List<Subject> getAll();


    <Optional> Subject findById(Long id);

}
