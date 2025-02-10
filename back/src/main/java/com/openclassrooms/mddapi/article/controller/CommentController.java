package com.openclassrooms.mddapi.article.controller;

import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.article.dto.model.CommentDto;
import com.openclassrooms.mddapi.article.mapper.comment.CommentMapper;
import com.openclassrooms.mddapi.article.model.Comment;
import com.openclassrooms.mddapi.article.service.comment.CommentService;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("article/comment")
@Log4j2
public class CommentController {

    private final CommentMapper commentMapper;
    private final CommentService commentService;

    public CommentController(
            CommentMapper commentMapper,
            CommentService commentService) {
        this.commentMapper = commentMapper;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CommentDto commentDto) {

        Comment comment = commentMapper.toEntity(commentDto);
        if (comment == null) {
            return ResponseEntity.badRequest().build();
        }
        commentService.save(comment);
        return ResponseEntity.ok().build();
    }

}
