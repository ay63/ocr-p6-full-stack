package com.openclassrooms.mddapi.subscription.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.subscription.model.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    boolean existsByUserIdAndSubjectId(Long userId, Long subjectId);

    void deleteByUserIdAndSubjectId(Long userId, Long subjectId);
}
