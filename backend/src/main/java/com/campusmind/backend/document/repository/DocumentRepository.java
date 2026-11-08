package com.campusmind.backend.document.repository;

import com.campusmind.backend.document.entity.Document;
import com.campusmind.backend.document.entity.DocumentVisibility;
import com.campusmind.backend.user.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface DocumentRepository
        extends JpaRepository<Document, UUID> {

    Page<Document> findByUploadedBy(
            User user,
            Pageable pageable
    );

    Optional<Document> findByIdAndUploadedBy(
            UUID id,
            User user
    );

    @Query("""
        SELECT d FROM Document d
        WHERE d.visibility = :visibility
        AND (
            :query IS NULL
            OR LOWER(d.title) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(d.subject) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(d.description) LIKE LOWER(CONCAT('%', :query, '%'))
        )
        AND (
            :subject IS NULL
            OR LOWER(d.subject) = LOWER(:subject)
        )
        AND (
            :semester IS NULL
            OR d.semester = :semester
        )
    """)
    Page<Document> searchPublicDocuments(
            @Param("visibility") DocumentVisibility visibility,
            @Param("query") String query,
            @Param("subject") String subject,
            @Param("semester") Integer semester,
            Pageable pageable
    );
}