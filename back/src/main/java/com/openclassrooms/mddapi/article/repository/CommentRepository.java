package com.openclassrooms.mddapi.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.article.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}
