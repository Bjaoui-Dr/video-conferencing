package com.security.spring.services;

import com.security.spring.dto.requestDto.SignInRequestDto;
import com.security.spring.dto.requestDto.SignUpRequestDto;
import com.security.spring.dto.responseDto.JwtAuthenticationResponseDto;
import com.security.spring.entities.User;
import com.security.spring.exceptions.BaseException;

public interface AuthenticationService {
    public JwtAuthenticationResponseDto signup(SignUpRequestDto signUpRequestDto) throws BaseException;
    public JwtAuthenticationResponseDto signin(SignInRequestDto signInRequestDto) throws BaseException;
}
