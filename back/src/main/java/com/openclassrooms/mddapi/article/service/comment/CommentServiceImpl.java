package com.openclassrooms.mddapi.article.service.comment;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.article.model.Comment;
import com.openclassrooms.mddapi.article.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    public CommentServiceImpl(
            CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment findById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public List<Comment> findAllByArticle(Article article) {
        return commentRepository.findAllByArticleOrderByCreatedAtDesc(article);
    }
}
