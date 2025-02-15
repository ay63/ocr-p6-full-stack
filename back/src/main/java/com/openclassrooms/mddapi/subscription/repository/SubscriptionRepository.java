package com.openclassrooms.mddapi.subscription.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subscription.model.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    boolean existsByUserIdAndSubjectId(Long userId, Long subjectId);

    void deleteByUserIdAndSubjectId(Long userId, Long subjectId);

    @Query(value = "SELECT s.* FROM subjects s WHERE s.id IN (SELECT su.subject_id FROM subscriptions su WHERE su.user_id = :userId)", nativeQuery = true)
    List<Subject> findAllSubscribeSubject(@Param("userId") Long userId);


}
