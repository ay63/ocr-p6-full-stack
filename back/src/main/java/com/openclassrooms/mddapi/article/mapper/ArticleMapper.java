package com.openclassrooms.mddapi.article.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import com.openclassrooms.mddapi.article.dto.model.ArticleDto;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subject.service.SubjectService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.user.UserService;


@Mapper(componentModel = "spring", uses = { UserService.class, SubjectService.class }, imports = { List.class,
        Collections.class, Collectors.class, Optional.class, User.class, Subject.class })
public abstract class ArticleMapper implements EntityMapper<ArticleDto, Article> {

    @Autowired
    protected SubjectService subjectService;

    @Autowired
    protected UserService userService;

    @Mapping(target = "author", expression = "java(getAuthorFromId(articleDto.getAuthorId()))")
    @Mapping(target = "subjects", expression = "java(getSubjectsFromIds(articleDto.getSubjects()))")
    public abstract Article toEntity(ArticleDto articleDto);

    @Mapping(source = "author.id", target = "authorId")
    @Mapping(target = "subjects", expression = "java(getSubjectIdsFromEntities(article.getSubjects()))")
    public abstract ArticleDto toDto(Article article);

    public User getAuthorFromId(Long authorId) {
        if (authorId != null) {
            return userService.findById(authorId);
        }
        return null;
    }

    public List<Subject> getSubjectsFromIds(List<Long> subjectIds) {
        if (subjectIds != null) {
            return subjectIds.stream()
                    .map(subjectService::findById)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<Long> getSubjectIdsFromEntities(List<Subject> subjects) {
        if (subjects != null) {
            return subjects.stream()
                    .map(Subject::getId)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}
