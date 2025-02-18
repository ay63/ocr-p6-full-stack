package com.openclassrooms.mddapi.subscription.service;

import java.util.List;

import com.openclassrooms.mddapi.subscription.model.Subscription;
import com.openclassrooms.mddapi.topic.model.Topic;

public interface SubscriptionService {

    void save(Subscription subscription);

    void newSubscription(Long subjectId, Long userId);

    void deleteSubscription(Long subjectId, Long userId);

    boolean isUserSubscribed(Long userId, Long subjectId); 

    List<Topic> findAllSubscribeSubject(Long userId);
 }
