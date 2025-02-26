package com.openclassrooms.mddapi.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.article.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

}
