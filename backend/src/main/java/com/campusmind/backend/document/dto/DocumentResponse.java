
package com.campusmind.backend.document.dto;

import com.campusmind.backend.document.entity.Document;
import com.campusmind.backend.document.entity.DocumentType;
import com.campusmind.backend.document.entity.DocumentVisibility;

import java.time.LocalDateTime;
import java.util.UUID;

public record DocumentResponse(
        UUID id,
        String title,
        String description,
        String subject,
        Integer semester,
        String academicYear,
        DocumentType documentType,
        DocumentVisibility visibility,
        String originalFileName,
        Long fileSize,
        Double fileSizeInMB,
        String uploadedBy,
        LocalDateTime createdAt
) {

    public static DocumentResponse from(Document document) {

        return new DocumentResponse(
                document.getId(),
                document.getTitle(),
                document.getDescription(),
                document.getSubject(),
                document.getSemester(),
                document.getAcademicYear(),
                document.getDocumentType(),
                document.getVisibility(),
                document.getOriginalFileName(),
                document.getFileSize(),
                Math.round(
                        document.getFileSize() / (1024.0 * 1024.0) * 100.0
                ) / 100.0,
                document.getUploadedBy().getFullName(),
                document.getCreatedAt()
        );
    }
}
