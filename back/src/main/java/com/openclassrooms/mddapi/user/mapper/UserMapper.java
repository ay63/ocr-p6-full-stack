package com.openclassrooms.mddapi.user.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.user.models.User;
import com.openclassrooms.mddapi.user.models.UserDto;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<UserDto, User> {

}
