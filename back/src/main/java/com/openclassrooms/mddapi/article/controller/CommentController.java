package com.openclassrooms.mddapi.article.controller;

import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.article.dto.model.CommentDto;
import com.openclassrooms.mddapi.article.mapper.comment.CommentMapper;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.model.Comment;
import com.openclassrooms.mddapi.article.service.article.ArticleService;
import com.openclassrooms.mddapi.article.service.comment.CommentService;
import com.openclassrooms.mddapi.auth.service.jwt.JwtService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("article/comment")
@Log4j2
public class CommentController {

    private final CommentMapper commentMapper;
    private final CommentService commentService;
    private final ArticleService articleService;
    private final UserService userService;
    private final JwtService jwtService;

    public CommentController(CommentMapper commentMapper,
            CommentService commentService,
            ArticleService articleService,
            UserService userService,
            JwtService jwtService) {
        this.commentMapper = commentMapper;
        this.commentService = commentService;
        this.articleService = articleService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Operation(
        description = "Post one comment",
        tags = {"Articles"},
        method = "GET"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Post one comment",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CommentDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "unauthorized",
                    content = @Content()
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Bad request",
                content = @Content()
        )
    })
    @PostMapping
    public ResponseEntity<?> create(Authentication authentication, @Valid @RequestBody CommentDto commentDto) {

        Comment comment = commentMapper.toEntity(commentDto);
        if (comment == null) {
            return ResponseEntity.badRequest().build();
        }

        User user = userService.findByEmail(jwtService.getTokenSubject(authentication));

        comment.setUser(user);
        commentService.save(comment);
        return ResponseEntity.ok().build();
    }

    @Operation(
        description = "Get article comments",
        tags = {"Articles"},
        method = "GET"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Get article comments",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CommentDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "unauthorized",
                    content = @Content()
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Bad request",
                content = @Content()
        )
    })
    @GetMapping("/{articleId}")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable("articleId") String articleId) {
        Article article = articleService.findById(Long.parseLong(articleId));

        if(article == null){
            return ResponseEntity.notFound().build();
        }

        List<Comment> comments = commentService.findAllByArticle(article);
        List<CommentDto> commentDtos = commentMapper.toDto(comments);

        return ResponseEntity.ok().body(commentDtos);
    }

}
