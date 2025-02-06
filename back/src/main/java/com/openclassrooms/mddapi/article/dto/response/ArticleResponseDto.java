package com.openclassrooms.mddapi.article.dto.response;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.user.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleResponseDto {

    private Long id;

    private String title;

    private Subject subjects;

    private String content;

    private User author;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
