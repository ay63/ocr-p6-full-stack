package com.openclassrooms.mddapi.subscription.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.share.exception.BadRequestException;
import com.openclassrooms.mddapi.share.exception.NotFoundException;
import com.openclassrooms.mddapi.subject.model.Subject;
import com.openclassrooms.mddapi.subject.respository.SubjectRepository;
import com.openclassrooms.mddapi.subscription.exception.SubscriptionAlreadyExistsException;
import com.openclassrooms.mddapi.subscription.model.Subscription;
import com.openclassrooms.mddapi.subscription.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public SubscriptionServiceImpl(
            SubscriptionRepository subscriptionRepository,
            SubjectRepository subjectRepository,
            UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void save(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }

    @Override
    public void newSubscription(Long subjectId, Long userId) {

        Subject subject = subjectRepository.findById(subjectId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (subject == null || user == null) {
            throw new NotFoundException();
        }

        if (subscriptionRepository.existsByUserIdAndSubjectId(userId, subjectId)) {
            throw new SubscriptionAlreadyExistsException();
        }

        Subscription subscription = Subscription.builder().user(user).subject(subject).build();

        try {
            subscriptionRepository.save(subscription);
        } catch (Exception e) {
            throw new BadRequestException();
        }

    }

    @Override
    @Transactional
    public void deleteSubscription(Long subjectId, Long userId) {
        Subject subject = subjectRepository.findById(subjectId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (subject == null || user == null) {
            throw new NotFoundException();
        }

        if (!subscriptionRepository.existsByUserIdAndSubjectId(userId, subjectId)) {
            throw new BadRequestException();
        }

        this.subscriptionRepository.deleteByUserIdAndSubjectId(user.getId(), subject.getId());
    }
}
