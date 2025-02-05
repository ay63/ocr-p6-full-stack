package com.openclassrooms.mddapi.article.service;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.repository.ArticleRepository;

@Service
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public void save(Article article) {
        this.articleRepository.save(article);
    }

    public Article findById(Long id) {
        return this.articleRepository.findById(id).orElse(null);
    }

}
