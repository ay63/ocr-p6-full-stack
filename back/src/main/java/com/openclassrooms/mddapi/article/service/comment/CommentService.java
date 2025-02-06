package com.openclassrooms.mddapi.article.service.comment;

import com.openclassrooms.mddapi.article.model.Comment;

public interface CommentService {

    void save(Comment comment);

    Comment findById(Long id);
}
