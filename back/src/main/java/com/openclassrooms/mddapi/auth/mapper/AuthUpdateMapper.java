package com.openclassrooms.mddapi.auth.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.openclassrooms.mddapi.auth.dto.request.AuthUpdateRequestDto;
import com.openclassrooms.mddapi.share.mapper.EntityMapper;
import com.openclassrooms.mddapi.user.model.User;

@Mapper(componentModel = "spring")
public abstract class AuthUpdateMapper implements EntityMapper<AuthUpdateRequestDto, User> {

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "profileName", source = "profileName")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", source = "password")
    public abstract User toEntity(AuthUpdateRequestDto dto);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "profileName", source = "profileName")
    @Mapping(target = "email", source = "email")
    public abstract AuthUpdateRequestDto toDto(User user);

}
