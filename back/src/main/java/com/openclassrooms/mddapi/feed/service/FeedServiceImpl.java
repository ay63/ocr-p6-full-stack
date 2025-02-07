package com.openclassrooms.mddapi.feed.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.feed.dto.response.FeedResponseDto;
import com.openclassrooms.mddapi.feed.mapper.FeedMapper;
import com.openclassrooms.mddapi.feed.repository.FeedRepository;

@Service
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final FeedMapper feedMapper;

    public FeedServiceImpl(FeedRepository feedRepository, FeedMapper feedMapper) {
        this.feedRepository = feedRepository;
        this.feedMapper = feedMapper;
    }

    @Override
    public List<FeedResponseDto> getFeedForUser(Long userId) {
        List<Article> articles = feedRepository.findFeedByUserId(userId);

        return feedMapper.toDto(articles);
    }

}
