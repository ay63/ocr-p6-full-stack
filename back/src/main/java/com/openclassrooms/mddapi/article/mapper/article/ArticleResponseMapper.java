package com.openclassrooms.mddapi.article.mapper.article;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.openclassrooms.mddapi.article.dto.response.ArticleResponseDto;
import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ArticleResponseMapper implements EntityMapper<ArticleResponseDto, Article> {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "subject.title", source = "subject")
    @Mapping(target = "author.profileName", source = "subject")
    public abstract Article toEntity(ArticleResponseDto articleResponseDto);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "subject", source = "subject.title")
    @Mapping(target = "author", source = "author.profileName")
    public abstract ArticleResponseDto toDto(Article article);

}