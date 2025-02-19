package com.openclassrooms.mddapi.article.service.comment;

import java.util.List;

import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.model.Comment;

public interface CommentService {

    void save(Comment comment);

    Comment findById(Long id);

    List<Comment> findAllByArticle(Article article);
}
