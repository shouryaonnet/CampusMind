package com.campusmind.backend.auth.controller;

import com.campusmind.backend.auth.dto.AuthResponse;
import com.campusmind.backend.auth.dto.LoginRequest;
import com.campusmind.backend.auth.dto.RegisterRequest;
import com.campusmind.backend.auth.dto.UserResponse;
import com.campusmind.backend.auth.service.AuthService;
import com.campusmind.backend.user.entity.User;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(
        @Valid @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
        @Valid @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse currentUser(
        @AuthenticationPrincipal User user
    ) {
        return new UserResponse(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole()
        );
    }
}