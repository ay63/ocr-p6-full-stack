package com.openclassrooms.mddapi.feed.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.feed.dto.response.FeedResponseDto;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.topic.model.Topic;
import com.openclassrooms.mddapi.topic.service.TopicService;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.service.UserService;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = { UserService.class,
        TopicService.class }, imports = { List.class,
                Collections.class, Collectors.class, Optional.class, User.class, Topic.class })
public abstract class FeedMapper implements EntityMapper<FeedResponseDto, Article> {

    @Autowired
    protected TopicService topicService;

    @Autowired
    protected UserService userService;

    @Mapping(target = "topic", expression = "java(getByTopicName(feedResponseDto.getTopic()))")
    public abstract Article toEntity(FeedResponseDto feedResponseDto);

    @Mapping(source = "author.profileName", target = "author")
    @Mapping(source = "topic.title", target = "topic")
    public abstract FeedResponseDto toDto(Article article);

    public User getAuthorFromId(Long authorId) {
        if (authorId == null) {
            return null;
        }
        return userService.findById(authorId);
    }

    public Topic getByTopicName(String title) {
        if (title == null) {
            return null;
        }
        return topicService.findByTitle(title);
    }

}
