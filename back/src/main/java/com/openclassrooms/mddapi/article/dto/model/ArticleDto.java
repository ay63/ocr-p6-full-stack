package com.openclassrooms.mddapi.article.dto.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleDto {

    private Long id;
    
    @NotBlank
    @Size(min = 10, max = 64)
    private String title;

    @NotNull
    private Long topic;

    @NotBlank
    @Size(max = 2000)
    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
