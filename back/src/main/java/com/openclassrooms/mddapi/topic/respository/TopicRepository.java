package com.openclassrooms.mddapi.topic.respository;

import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.topic.model.Topic;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    Topic findByTitle(String title);
}
