package com.openclassrooms.mddapi.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.article.model.Comment;
import java.util.List;
import com.openclassrooms.mddapi.article.model.Article;


public interface CommentRepository extends JpaRepository<Comment, Long>{
    
    List<Comment> findAllByArticle(Article article);
}
