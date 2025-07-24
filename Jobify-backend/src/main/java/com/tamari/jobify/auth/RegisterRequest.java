package com.tamari.jobify.auth;

import lombok.*;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
}
