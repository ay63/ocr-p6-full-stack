package com.openclassrooms.mddapi.subject.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openclassrooms.mddapi.article.dto.response.ArticleResponseDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectDto {
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    @Size(max = 256)
    private String description;

    @JsonIgnore
    private List<ArticleResponseDto> articles;
}
