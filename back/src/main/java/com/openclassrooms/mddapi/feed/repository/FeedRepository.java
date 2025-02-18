package com.openclassrooms.mddapi.feed.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.article.model.Article;

@Repository
public interface FeedRepository extends JpaRepository<Article, Long> {
    
    @Query("SELECT a FROM Article a WHERE a.topic.id IN (SELECT s.topic.id FROM Subscription s WHERE s.user.id = :userId) ORDER BY a.createdAt DESC")
    List<Article> findFeedByUserId(@Param("userId") Long userId);
}
