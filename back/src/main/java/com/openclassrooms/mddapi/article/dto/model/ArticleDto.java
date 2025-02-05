package com.openclassrooms.mddapi.article.dto.model;

import java.time.LocalDateTime;
import java.util.List;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

    @NotEmpty
    private List<Long> subjects;

    @NotBlank
    @Size(max = 2000)
    private String content;

    @NotNull
    private Long authorId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
