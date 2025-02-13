package com.openclassrooms.mddapi.article.mapper.article;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import com.openclassrooms.mddapi.article.dto.model.ArticleDto;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subject.service.SubjectService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = { UserService.class, SubjectService.class }, imports = { List.class,
                Collections.class, Collectors.class, Optional.class, User.class, Subject.class })
public abstract class ArticleMapper implements EntityMapper<ArticleDto, Article> {

    @Autowired
    protected SubjectService subjectService;

    @Autowired
    protected UserService userService;

    @Mapping(target = "subject", expression = "java(getSubjectId(articleDto.getSubject()))")
    public abstract Article toEntity(ArticleDto articleDto);

    @Mapping(source = "subject.id", target = "subject")
    public abstract ArticleDto toDto(Article article);

    public User getAuthorFromId(Long authorId) {
        if (authorId == null) {
            return null;
        }
        return userService.findById(authorId);
    }

    public Subject getSubjectId(Long subjectId) {
        if (subjectId == null) {
            return null;
        }
        return subjectService.findById(subjectId);
    }

}
