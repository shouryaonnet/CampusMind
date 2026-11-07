package com.campusmind.backend.auth.dto;

import com.campusmind.backend.user.entity.UserRole;
import java.util.UUID;

public record AuthResponse(
    UUID id,
    String fullName,
    String email,
    UserRole role,
    String token,
    String tokenType
) {}