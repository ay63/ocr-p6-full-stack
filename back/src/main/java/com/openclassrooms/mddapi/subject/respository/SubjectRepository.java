package com.openclassrooms.mddapi.subject.respository;

import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.subject.model.Subject;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

}
