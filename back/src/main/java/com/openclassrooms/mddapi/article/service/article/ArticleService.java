package com.openclassrooms.mddapi.article.service.article;

import java.util.List;

import com.openclassrooms.mddapi.article.model.Article;

public interface ArticleService {
    
    void save(Article article);

    Article findById(Long id); 

    List<Article> findAllByOrderByCreatedAtDesc();

}
