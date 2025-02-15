package com.openclassrooms.mddapi.subject.mapper;

import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.openclassrooms.mddapi.article.mapper.article.ArticleMapper;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.subject.dto.SubjectDto;
import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subscription.service.SubscriptionService;
import com.openclassrooms.mddapi.user.model.User;

@Component
@Mapper(componentModel = "spring", uses = ArticleMapper.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SubjectMapper implements EntityMapper<SubjectDto, Subject> {

    private SubscriptionService subscriptionService;

    @Autowired
    public void setSubscriptionService(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @Mapping(target = "articles", source = "articles")
    @Mapping(target = "isSubscribed", ignore = true) 
    public abstract SubjectDto toDto(Subject subject, @Context Long userId);

    public List<SubjectDto> toDtoList(List<Subject> subjects, @Context Long userId) {
        return subjects.stream()
                .map(subject -> toDto(subject, userId))
                .collect(Collectors.toList());
    }

    @AfterMapping
    protected void setIsSubscribed(@MappingTarget SubjectDto dto, Subject subject, @Context Long userId) {
        if (subscriptionService != null && userId != null) {
            dto.setIsSubscribed(subscriptionService.isUserSubscribed(userId, subject.getId()));
        } else {
            dto.setIsSubscribed(false);
        }
    }

    String map(User value) {
        return value != null ? value.getUsername() : null;
    }

    String map(Subject value) {
        return value != null ? value.getTitle() : null;
    }
}
