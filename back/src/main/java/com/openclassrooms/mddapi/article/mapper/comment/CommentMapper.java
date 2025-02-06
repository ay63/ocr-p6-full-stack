package com.openclassrooms.mddapi.article.mapper.comment;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.openclassrooms.mddapi.article.dto.model.CommentDto;
import com.openclassrooms.mddapi.article.model.Comment;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;

@Mapper(componentModel = "spring")
public abstract class CommentMapper implements EntityMapper<CommentDto, Comment> {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "articleId", target = "article.id")
    @Mapping(source = "comment", target = "comment")
    public abstract Comment toEntity(CommentDto commentDto);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "article.id", target = "articleId")
    @Mapping(source = "comment", target = "comment")
    public abstract CommentDto toDto(Comment Comment);

}
