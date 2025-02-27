package com.openclassrooms.mddapi.user.service;

import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.user.dto.request.UserUpdateRequestDto;
import com.openclassrooms.mddapi.user.model.User;
import com.openclassrooms.mddapi.user.repository.UserRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.Validator;
import com.openclassrooms.mddapi.auth.validator.password.ValidPasswordConstraint;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ValidPasswordConstraint validPasswordConstraint;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
            com.openclassrooms.mddapi.auth.validator.password.ValidPasswordConstraint validPasswordConstraint) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.validPasswordConstraint = validPasswordConstraint;
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
    public Boolean existsByProfileName(String username) {
        return userRepository.existsByProfileName(username);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User updateUserData(User user, UserUpdateRequestDto userUpdateRequestDto){
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        if (userUpdateRequestDto.getEmail() != null && !userUpdateRequestDto.getEmail().isBlank()) {

            int emailLength = userUpdateRequestDto.getEmail().length();
            Set<ConstraintViolation<UserUpdateRequestDto>> violations = validator
                .validateProperty(userUpdateRequestDto, "email");
            
            if (!violations.isEmpty() || emailLength < 6 && emailLength > 64 ) {
                throw new ConstraintViolationException(violations);
            }

            user.setEmail(userUpdateRequestDto.getEmail());
        }

        if (userUpdateRequestDto.getPassword() != null && !userUpdateRequestDto.getPassword().isBlank()) {
            int passwordLength = userUpdateRequestDto.getPassword().length();
            boolean isValidPattern = validPasswordConstraint.isValid(userUpdateRequestDto.getPassword(), null);
            
            if (!isValidPattern || passwordLength < 8 && passwordLength > 64) {
                throw new ConstraintViolationException("Validation failed : check pattern or length",null);
            }

            user.setPassword(passwordEncoder.encode(userUpdateRequestDto.getPassword()));
        }

        if (userUpdateRequestDto.getProfileName() != null && !userUpdateRequestDto.getProfileName().isBlank()) {
            int profileNameLength = userUpdateRequestDto.getProfileName().length();
            if(profileNameLength < 3 && profileNameLength > 16){
                throw new ConstraintViolationException("Validation failed : check length",null);
            }
            user.setProfileName(userUpdateRequestDto.getProfileName());
        }

        return this.userRepository.save(user);
    }



}
