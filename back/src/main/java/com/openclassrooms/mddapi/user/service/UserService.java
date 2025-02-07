package com.openclassrooms.mddapi.user.service;

import com.openclassrooms.mddapi.user.model.User;

public interface UserService {

    User findById(Long id);

    User findByEmail(String email);

    Boolean existsByEmail(String email);

    void save(User user);
}
