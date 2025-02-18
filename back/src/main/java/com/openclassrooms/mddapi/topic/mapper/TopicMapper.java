package com.openclassrooms.mddapi.topic.mapper;

import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.openclassrooms.mddapi.article.mapper.article.ArticleMapper;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.subscription.service.SubscriptionService;
import com.openclassrooms.mddapi.topic.dto.TopicDto;
import com.openclassrooms.mddapi.topic.model.Topic;
import com.openclassrooms.mddapi.user.model.User;

@Component
@Mapper(componentModel = "spring", uses = ArticleMapper.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class TopicMapper implements EntityMapper<TopicDto, Topic> {

    private SubscriptionService subscriptionService;

    @Autowired
    public void setSubscriptionService(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @Mapping(target = "articles", source = "articles")
    @Mapping(target = "isSubscribed", ignore = true) 
    public abstract TopicDto toDto(Topic topic, @Context Long userId);

    public List<TopicDto> toDtoList(List<Topic> topics, @Context Long userId) {
        return topics.stream()
                .map(topic -> toDto(topic, userId))
                .collect(Collectors.toList());
    }

    @AfterMapping
    protected void setIsSubscribed(@MappingTarget TopicDto dto, Topic topic, @Context Long userId) {
        if (subscriptionService != null && userId != null) {
            dto.setIsSubscribed(subscriptionService.isUserSubscribed(userId, topic.getId()));
        } else {
            dto.setIsSubscribed(false);
        }
    }

    String map(User value) {
        return value != null ? value.getProfileName() : null;
    }

    String map(Topic value) {
        return value != null ? value.getTitle() : null;
    }
}
