package com.security.spring.controller;

import com.security.spring.dto.requestDto.SignInRequestDto;
import com.security.spring.dto.requestDto.SignUpRequestDto;
import com.security.spring.dto.responseDto.JwtAuthenticationResponseDto;
import com.security.spring.entities.User;
import com.security.spring.exceptions.BaseException;
import com.security.spring.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponseDto> signup(@RequestBody SignUpRequestDto signUpRequestDto) throws BaseException {
        return ResponseEntity.ok(authenticationService.signup(signUpRequestDto));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponseDto> signup(@RequestBody SignInRequestDto signInRequestDto) throws BaseException {
        return ResponseEntity.ok(authenticationService.signin(signInRequestDto));
    }

}
