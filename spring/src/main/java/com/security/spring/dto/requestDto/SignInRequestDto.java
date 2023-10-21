package com.security.spring.dto.requestDto;

import lombok.Data;

@Data
public class SignInRequestDto {
    private String email;
    private String password;
}
