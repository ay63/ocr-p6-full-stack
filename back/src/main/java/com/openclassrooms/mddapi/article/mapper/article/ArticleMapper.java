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
import com.openclassrooms.mddapi.topic.model.Topic;
import com.openclassrooms.mddapi.topic.service.TopicService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = { UserService.class, TopicService.class }, imports = { List.class,
                Collections.class, Collectors.class, Optional.class, User.class, Topic.class })
public abstract class ArticleMapper implements EntityMapper<ArticleDto, Article> {

    @Autowired
    protected TopicService topicService;

    @Autowired
    protected UserService userService;

    @Mapping(target = "topic", expression = "java(getTopicId(articleDto.getTopic()))")
    public abstract Article toEntity(ArticleDto articleDto);

    @Mapping(source = "topic.id", target = "topic")
    public abstract ArticleDto toDto(Article article);

    public User getAuthorFromId(Long authorId) {
        if (authorId == null) {
            return null;
        }
        return userService.findById(authorId);
    }

    public Topic getTopicId(Long topicId) {
        if (topicId == null) {
            return null;
        }
        return topicService.findById(topicId);
    }

}
