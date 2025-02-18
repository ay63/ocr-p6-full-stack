package com.openclassrooms.mddapi.subscription.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.share.exception.BadRequestException;
import com.openclassrooms.mddapi.share.exception.NotFoundException;
import com.openclassrooms.mddapi.subscription.exception.SubscriptionAlreadyExistsException;
import com.openclassrooms.mddapi.subscription.model.Subscription;
import com.openclassrooms.mddapi.subscription.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.topic.model.Topic;
import com.openclassrooms.mddapi.topic.respository.TopicRepository;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public SubscriptionServiceImpl(
            SubscriptionRepository subscriptionRepository,
            TopicRepository topicRepository,
            UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void save(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }

    @Override
    public void newSubscription(Long topicId, Long userId) {

        Topic topic = topicRepository.findById(topicId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (topic == null || user == null) {
            throw new NotFoundException();
        }

        if (subscriptionRepository.existsByUserIdAndTopicId(userId, topicId)) {
            throw new SubscriptionAlreadyExistsException();
        }

        Subscription subscription = Subscription.builder().user(user).topic(topic).build();

        try {
            subscriptionRepository.save(subscription);
        } catch (Exception e) {
            throw new BadRequestException();
        }

    }

    @Override
    @Transactional
    public void deleteSubscription(Long topicId, Long userId) {
        Topic topic = topicRepository.findById(topicId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (topic == null || user == null) {
            throw new NotFoundException();
        }

        if (!subscriptionRepository.existsByUserIdAndTopicId(userId, topicId)) {
            throw new BadRequestException();
        }

        this.subscriptionRepository.deleteByUserIdAndTopicId(user.getId(), topic.getId());
    }

    @Override
    public boolean isUserSubscribed(Long userId, Long topicId) {
        if (userId == null || topicId == null) {
            return false;
        }
        return subscriptionRepository.existsByUserIdAndTopicId(userId, topicId);
    }

    @Override
    public List<Topic> findAllSubscribeSubject(Long userId) {
        return subscriptionRepository.findAllSubscribeSubject(userId);
    }
}
