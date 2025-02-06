package com.openclassrooms.mddapi.article.mapper.article;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.openclassrooms.mddapi.article.dto.response.ArticleResponseDto;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;

@Mapper(componentModel = "spring")
public abstract class ArticleResponseMapper implements EntityMapper<ArticleResponseDto, Article> {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "subject.name", source = "subjectName")
    @Mapping(target = "author.profileName", source = "subjectName")
    public abstract Article toEntity(ArticleResponseDto articleResponseDto);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "subjectName", source = "subject.name")
    @Mapping(target = "authorName", source = "author.profileName")
    public abstract ArticleResponseDto toDto(Article article);

}