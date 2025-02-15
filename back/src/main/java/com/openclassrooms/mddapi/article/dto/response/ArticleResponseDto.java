package com.openclassrooms.mddapi.article.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleResponseDto {

    private Long id;

    @NotBlank
    @Size(min = 10, max = 64)
    private String title;

    @NotNull
    private String subject;

    @NotBlank
    @Size(max = 2000)
    private String content;

    @NotNull
    private String author;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
