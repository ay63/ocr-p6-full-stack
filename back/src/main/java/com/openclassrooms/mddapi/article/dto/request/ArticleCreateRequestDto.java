package com.openclassrooms.mddapi.article.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleCreateRequestDto {

    @NotBlank
    @Size(min = 10, max = 64)
    private String title;

    @NotEmpty
    private Long topic;

    @NotBlank
    @Size(max = 2000)
    private String content;

}
