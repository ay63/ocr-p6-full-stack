package com.openclassrooms.mddapi.article.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.article.dto.model.ArticleDto;
import com.openclassrooms.mddapi.article.dto.response.ArticleResponseDto;
import com.openclassrooms.mddapi.article.mapper.article.ArticleMapper;
import com.openclassrooms.mddapi.article.mapper.article.ArticleResponseMapper;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.service.article.ArticleService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("article")
public class ArticleController {

    private ArticleMapper articleMapper;
    private ArticleService articleService;
    private ArticleResponseMapper articleResponseMapper;
    private UserService userService;

    public ArticleController(ArticleMapper articleMapper, ArticleService articleService,
            ArticleResponseMapper articleResponseMapper, UserService userService) {
        this.articleMapper = articleMapper;
        this.articleService = articleService;
        this.articleResponseMapper = articleResponseMapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> all(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Article> articles = articleService.findAllArticleByAuthorIdNot(user.getId());

        List<ArticleResponseDto> articleResponseDtos = articleResponseMapper.toDto(articles);

        return ResponseEntity.ok().body(articleResponseDtos);
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@Valid @RequestBody ArticleDto articleDto, Authentication authentication) {
        Article article = this.articleMapper.toEntity(articleDto);

        if (article == null) {
            return ResponseEntity.badRequest().build();
        }

        String email = authentication.getName();
        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        article.setAuthor(user);
        this.articleService.save(article);

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ArticleResponseDto> get(@PathVariable("id") Long id) {
        Article article = this.articleService.findById(id);

        if (article == null) {
            ResponseEntity.badRequest().build();
        }

        ArticleResponseDto articleResponseDto = this.articleResponseMapper.toDto(article);

        return ResponseEntity.ok().body(articleResponseDto);
    }

}
