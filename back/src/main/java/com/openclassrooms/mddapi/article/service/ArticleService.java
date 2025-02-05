package com.openclassrooms.mddapi.article.service;

import com.openclassrooms.mddapi.article.model.Article;

public interface ArticleService {
    
    void save(Article article);

    Article findById(Long id); 
}
