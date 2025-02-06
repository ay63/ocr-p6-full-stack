package com.openclassrooms.mddapi.subject.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subject.respository.SubjectRepository;

@Service
public class SubjectServiceImpl implements SubjectService {

    private SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Subject> getAll() {
        return subjectRepository.findAll();
    }

    @Override
    public <Optional> Subject findById(Long id) {
        return this.subjectRepository.findById(id).orElse(null);
    }

}
