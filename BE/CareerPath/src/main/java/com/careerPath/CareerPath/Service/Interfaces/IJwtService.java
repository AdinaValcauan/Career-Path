package com.careerPath.CareerPath.Service.Interfaces;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface IJwtService {
    String generateToken(String userEmail);

    String extractUserEmail(String token);

    Date extractExpiration(String token);

    Boolean validateToken(String token, UserDetails userDetails);
}
