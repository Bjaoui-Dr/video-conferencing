package com.security.spring.services.impl;

import com.security.spring.dto.requestDto.SignInRequestDto;
import com.security.spring.dto.requestDto.SignUpRequestDto;
import com.security.spring.dto.responseDto.JwtAuthenticationResponseDto;
import com.security.spring.entities.Role;
import com.security.spring.entities.User;
import com.security.spring.exceptions.BaseException;
import com.security.spring.repositories.UserRepository;
import com.security.spring.services.AuthenticationService;
import com.security.spring.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;


    public JwtAuthenticationResponseDto signup(SignUpRequestDto signUpRequestDto) throws BaseException {
        if(userRepository.findByEmail(signUpRequestDto.getEmail()).isPresent()){
            throw new BaseException("Email already exist", HttpStatus.BAD_REQUEST);
        }

        User user = new User();

        user.setEmail(signUpRequestDto.getEmail());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signUpRequestDto.getPassword()));
        user.setFirstName(signUpRequestDto.getFirstName());
        user.setLastName(signUpRequestDto.getLastName());
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);

        JwtAuthenticationResponseDto jwtAuthenticationResponseDto = new JwtAuthenticationResponseDto();
        jwtAuthenticationResponseDto.setToken(jwt);
        jwtAuthenticationResponseDto.setRole(user.getRole().name());

        return jwtAuthenticationResponseDto;
    }

    public JwtAuthenticationResponseDto signin(SignInRequestDto signInRequestDto) throws BaseException {
        try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequestDto.getEmail(),
                        signInRequestDto.getPassword())
        );

        var user = userRepository.findByEmail(signInRequestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Incorrect Email or password"));
        var jwt = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponseDto jwtAuthenticationResponseDto = new JwtAuthenticationResponseDto();
        jwtAuthenticationResponseDto.setToken(jwt);
        jwtAuthenticationResponseDto.setRole(user.getRole().name());
//        jwtAuthenticationResponseDto.setRefreshToken(refreshToken);

        return jwtAuthenticationResponseDto;
        } catch (AuthenticationException e) {
            throw new BaseException("Incorrect Email or password", HttpStatus.BAD_REQUEST);
        }

    }
}
