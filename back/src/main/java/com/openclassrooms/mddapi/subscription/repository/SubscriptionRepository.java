package com.openclassrooms.mddapi.subscription.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.subscription.model.Subscription;
import com.openclassrooms.mddapi.topic.model.Topic;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    boolean existsByUserIdAndTopicId(Long userId, Long topicId);

    void deleteByUserIdAndTopicId(Long userId, Long topicId);

    @Query(value = "SELECT t.* FROM topics t WHERE t.id IN (SELECT su.topic_id FROM subscriptions su WHERE su.user_id = :userId)", nativeQuery = true)
    List<Topic> findAllSubscribeSubject(@Param("userId") Long userId);


}
