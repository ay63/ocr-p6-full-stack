package com.openclassrooms.mddapi.article.service.article;

import com.openclassrooms.mddapi.article.model.Article;

public interface ArticleService {
    
    void save(Article article);

    Article findById(Long id); 
}
