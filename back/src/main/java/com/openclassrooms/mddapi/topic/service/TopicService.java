package com.openclassrooms.mddapi.topic.service;

import java.util.List;

import com.openclassrooms.mddapi.topic.model.Topic;

public interface TopicService {

    List<Topic> getAll();

    <Optional> Topic findById(Long id);

    Topic findByTitle(String topicName);

}
