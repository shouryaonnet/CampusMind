package com.campusmind.backend.auth.service;

import com.campusmind.backend.auth.dto.AuthResponse;
import com.campusmind.backend.auth.dto.LoginRequest;
import com.campusmind.backend.auth.dto.RegisterRequest;
import com.campusmind.backend.security.JwtService;
import com.campusmind.backend.user.entity.User;
import com.campusmind.backend.user.entity.UserRole;
import com.campusmind.backend.user.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "An account with this email already exists"
            );
        }

        User user = new User();

        user.setFullName(request.fullName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.STUDENT);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser.getEmail());

        return toAuthResponse(savedUser, token);
    }

    public AuthResponse login(LoginRequest request) {

        String email = request.email().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            ));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(user.getEmail());

        return toAuthResponse(user, token);
    }

    private AuthResponse toAuthResponse(User user, String token) {

        return new AuthResponse(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole(),
            token,
            "Bearer"
        );
    }
}