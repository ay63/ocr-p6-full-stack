package com.openclassrooms.mddapi.feed.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedResponseDto {

    private Long id;

    private String title;

    private String topic;

    private String content;

    private String author;

    private LocalDateTime createdAt;

}
