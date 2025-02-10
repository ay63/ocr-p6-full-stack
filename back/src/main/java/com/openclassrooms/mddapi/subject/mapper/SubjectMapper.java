package com.openclassrooms.mddapi.subject.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.article.mapper.article.ArticleMapper;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.subject.dto.SubjectDto;
import com.openclassrooms.mddapi.subject.model.Subject;

@Component
@Mapper(componentModel = "spring", uses = ArticleMapper.class) 
public abstract class SubjectMapper implements EntityMapper<SubjectDto, Subject> {

    @Mapping(target = "articles", source = "articles") 
    public abstract Subject toEntity(SubjectDto dto);

    @Mapping(target = "articles", source = "articles") 
    public abstract SubjectDto toDto(Subject subject);
}
