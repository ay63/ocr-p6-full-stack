package com.openclassrooms.mddapi.feed.service;

import java.util.List;

import com.openclassrooms.mddapi.feed.dto.response.FeedResponseDto;

public interface FeedService {

    List<FeedResponseDto> getFeedForUser(Long id);

}
