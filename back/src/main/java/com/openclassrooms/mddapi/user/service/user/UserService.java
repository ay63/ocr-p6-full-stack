package com.openclassrooms.mddapi.user.service.user;

import com.openclassrooms.mddapi.user.model.User;

public interface UserService {

    User findUserById(Long id);

    User findUserByEmail(String email);

    Boolean existsByEmail(String email);

    void save(User user);
}
