package com.openclassrooms.mddapi.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.user.dto.request.UserUpdateRequestDto;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findById(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User update(User user, UserUpdateRequestDto userUpdateRequestDto) {
        if (userUpdateRequestDto.getEmail() != null && !userUpdateRequestDto.getEmail().isBlank()) {
            user.setEmail(userUpdateRequestDto.getEmail());
        }

        if (userUpdateRequestDto.getPassword() != null && !userUpdateRequestDto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userUpdateRequestDto.getPassword()));
        }

        if (userUpdateRequestDto.getProfileName() != null && !userUpdateRequestDto.getProfileName().isBlank()) {
            user.setProfileName(userUpdateRequestDto.getProfileName());
        }

        return user;
    }

}
