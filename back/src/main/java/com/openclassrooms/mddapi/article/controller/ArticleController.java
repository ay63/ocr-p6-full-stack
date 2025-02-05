package com.openclassrooms.mddapi.article.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.article.dto.model.ArticleDto;
import com.openclassrooms.mddapi.article.dto.response.ArticleResponse;
import com.openclassrooms.mddapi.article.mapper.ArticleMapper;
import com.openclassrooms.mddapi.article.mapper.ArticleResponseMapper;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.service.ArticleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("article")
public class ArticleController {

    private ArticleMapper articleMapper;
    private ArticleService articleService;
    private ArticleResponseMapper articleResponseMapper;

    public ArticleController(
            ArticleMapper articleMapper,
            ArticleService articleService,
            ArticleResponseMapper articleResponseMapper) {
        this.articleMapper = articleMapper;
        this.articleService = articleService;
        this.articleResponseMapper = articleResponseMapper;

    }

    @PostMapping("create")
    public ResponseEntity<?> create(@Valid @RequestBody ArticleDto articleDto) {
        Article article = this.articleMapper.toEntity(articleDto);

        this.articleService.save(article);

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ArticleResponse> get(@PathVariable("id") Long id) {

        Article article = this.articleService.findById(id);

        if (article == null) {
            ResponseEntity.badRequest().build();
        }

        ArticleResponse articleResponse = this.articleResponseMapper.toArticleResponse(article);

        return ResponseEntity.ok().body(articleResponse);
    }

}
