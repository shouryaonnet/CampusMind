package com.campusmind.backend.auth.dto;

import com.campusmind.backend.user.entity.UserRole;
import java.util.UUID;

public record UserResponse(
    UUID id,
    String fullName,
    String email,
    UserRole role
) {}