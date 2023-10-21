package com.security.spring.services;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JWTService {
    public String extractUsername(String token);
    public String generateToken(UserDetails userDetails);
//    public String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);
    public Boolean isTokenValid(String token, UserDetails userDetails);
}
