package com.openclassrooms.mddapi.user.dto.request;


import com.openclassrooms.mddapi.auth.validator.password.isValidPassword;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDto {
    
    @Email
    private String email;

    @isValidPassword
    private String password;

    
    private String profileName;

}
