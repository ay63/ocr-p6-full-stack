package com.openclassrooms.mddapi.article.dto.request;

import java.util.List;

import com.openclassrooms.mddapi.subject.model.Subject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleCreateRequest {

    private String title;

    private List<Subject> subjects;

    private String content;

}
