package com.tamari.jobify.auth;

import com.tamari.jobify.model.User;
import com.tamari.jobify.model.Role; 
import com.tamari.jobify.repository.UserRepository;
import com.tamari.jobify.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest req) {
        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.USER) // Hardcoded to USER for registration
                .build();

        userRepo.save(user);
        String jwt = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build()
        );
        return AuthResponse.builder()
                .token(jwt)
                .userId(user.getId())
                .userEmail(user.getEmail())
                .fullName(user.getFullName())
                .userRole(user.getRole()) // Populate the userRole
                .build();
    }

    public AuthResponse login(AuthRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getEmail(), req.getPassword()
                )
        );

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String jwt = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build()
        );
        return AuthResponse.builder()
                .token(jwt)
                .userId(user.getId())
                .userEmail(user.getEmail())
                .fullName(user.getFullName())
                .userRole(user.getRole()) // Populate the userRole
                .build();
    }
}