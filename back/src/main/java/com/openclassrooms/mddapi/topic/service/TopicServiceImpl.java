package com.openclassrooms.mddapi.topic.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.topic.model.Topic;
import com.openclassrooms.mddapi.topic.respository.TopicRepository;

@Service
public class TopicServiceImpl implements TopicService {

    private TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Topic> getAll() {
        return topicRepository.findAll();
    }

    @Override
    public <Optional> Topic findById(Long id) {
        return this.topicRepository.findById(id).orElse(null);
    }

    @Override
    public Topic findByTitle(String title) {
        return this.topicRepository.findByTitle(title);
    }

}
