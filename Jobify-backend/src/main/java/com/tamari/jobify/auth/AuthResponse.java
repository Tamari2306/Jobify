package com.tamari.jobify.auth;

import com.tamari.jobify.model.Role; // <--- Make sure to import Role
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    
    private Long userId; 
    private String userEmail;
    private String fullName;
    private Role userRole; 
}