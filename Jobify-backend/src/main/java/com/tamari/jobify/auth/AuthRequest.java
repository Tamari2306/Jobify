package com.tamari.jobify.auth;

import lombok.*;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
