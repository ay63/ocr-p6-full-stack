package com.openclassrooms.mddapi.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.article.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("SELECT a FROM Article a WHERE a.author.id <> :userId ORDER BY a.createdAt DESC")
    List<Article> findAllArticleByAuthorIdNot(@Param("userId") Long userId);
}
