package com.openclassrooms.mddapi.user.service;

import com.openclassrooms.mddapi.user.models.User;

public interface UserService {

    User findUserById(Long id);

    User findUserByEmail(String email);

    Boolean existsByEmail(String email);

    void save(User user);
}
