package com.security.spring.dto.responseDto;

import lombok.Data;

@Data
public class JwtAuthenticationResponseDto {
    private String token;
//    private String refreshToken;
    private String role;
}
