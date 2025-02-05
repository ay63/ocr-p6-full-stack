package com.openclassrooms.mddapi.article.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.article.dto.model.ArticleDto;
import com.openclassrooms.mddapi.article.mapper.ArticleMapper;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.service.ArticleService;
import com.openclassrooms.mddapi.user.service.user.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("article")
public class ArticleController {

    private ArticleMapper articleMapper;
    private ArticleService articleService;
    public ArticleController(ArticleMapper articleMapper, ArticleService articleService) {
        this.articleMapper = articleMapper;
        this.articleService = articleService;
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@Valid @RequestBody ArticleDto articleDto) {
        Article article = this.articleMapper.toEntity(articleDto);
        
        this.articleService.save(article);

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ArticleDto> get(@PathVariable("id") Long id) {


        Article article = this.articleService.findById(id);

        if(article == null){
            ResponseEntity.badRequest().build();
        }

        ArticleDto articleDto = this.articleMapper.toDto(article);

        return ResponseEntity.ok().body(articleDto);
    }

}
