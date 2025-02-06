package com.openclassrooms.mddapi.subscription.service;

import com.openclassrooms.mddapi.subscription.model.Subscription;

public interface SubscriptionService {

    void save(Subscription subscription);

    void newSubscription(Long subjectId, Long userId);

    void deleteSubscription(Long subjectId, Long userId);
}
