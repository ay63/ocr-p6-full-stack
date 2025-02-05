package com.openclassrooms.mddapi.article.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleCreateRequest {

    @NotBlank
    @Size(min = 10, max = 64)
    private String title;

    @NotEmpty
    private List<Long> subjects;

    @NotBlank
    @Size(max = 2000)
    private String content;

}
