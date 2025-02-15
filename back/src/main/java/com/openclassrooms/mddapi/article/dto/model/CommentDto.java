package com.openclassrooms.mddapi.article.dto.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {

    private Long id;

    @NotBlank
    private String comment;

    @Positive
    @NotNull
    private Long articleId;
    
    private String profileName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
