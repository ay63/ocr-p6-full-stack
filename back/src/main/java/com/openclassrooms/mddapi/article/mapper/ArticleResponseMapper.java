package com.openclassrooms.mddapi.article.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.openclassrooms.mddapi.article.dto.response.ArticleResponse;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subject.service.SubjectService;

@Mapper(componentModel = "spring")
public abstract class ArticleResponseMapper {

    private final SubjectService subjectService;

    public ArticleResponseMapper(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @Mapping(target = "subjects", expression = "java(getSubjectsFromIds(article.getSubjects()))")
    public abstract ArticleResponse toArticleResponse(Article article);

    public List<Subject> getSubjectsFromIds(List<Long> subjectIds) {
        if (subjectIds == null || subjectIds.isEmpty()) {
            return Collections.emptyList();

        }

        List<Subject> subjects = new ArrayList<>();

        for (Long id : subjectIds) {
            Subject subject = subjectService.findById(id);
            if (subject != null) {
                subjects.add(subject);
            }
        }
        return subjects;
    }

}