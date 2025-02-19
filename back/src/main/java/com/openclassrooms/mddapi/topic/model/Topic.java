package com.openclassrooms.mddapi.topic.model;

import java.util.ArrayList;
import java.util.List;

import com.openclassrooms.mddapi.article.model.Article;
import com.openclassrooms.mddapi.subscription.model.Subscription;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "topics")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 32)
    @NotBlank
    @Column(unique = true)
    private String title;

    @Size(min = 5, max = 256)
    @NotBlank
    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "topic", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "topic", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Subscription> subscriptions = new ArrayList<>();
}