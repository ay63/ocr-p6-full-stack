package com.openclassrooms.mddapi.user.dto.request;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDto {
    
    @Email
    private String email;

    private String password;

    private String profileName;

}
