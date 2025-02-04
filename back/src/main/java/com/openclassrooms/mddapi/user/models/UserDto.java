package com.openclassrooms.mddapi.user.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;

    @NonNull
    @Size(min = 8, max = 64)
    @Email
    private String email;

    @NonNull
    @Size(min = 3, max = 20)
    private String lastName;

    @NonNull
    @Size(min = 3, max = 20)
    private String firstName;

    // @todo add custom validation for password
    @JsonIgnore
    @Size(min = 8, max = 64)
    private String password;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
