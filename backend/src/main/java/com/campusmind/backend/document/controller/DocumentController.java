
package com.campusmind.backend.document.controller;

import com.campusmind.backend.document.dto.DocumentResponse;
import com.campusmind.backend.document.entity.DocumentType;
import com.campusmind.backend.document.entity.DocumentVisibility;
import com.campusmind.backend.document.service.DocumentService;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentResponse> uploadDocument(

            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("subject") String subject,
            @RequestParam("semester") Integer semester,
            @RequestParam("academicYear") String academicYear,
            @RequestParam("documentType") DocumentType documentType,

            @RequestParam(value = "description", required = false)
            String description,

            @RequestParam(value = "visibility", required = false)
            DocumentVisibility visibility,

            Authentication authentication
    ) {

        DocumentResponse response = documentService.uploadDocument(
            file,
            title,
            description,
            subject,
            semester,
            academicYear,
            documentType,
            visibility,
            authentication.getName()
        );

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<DocumentResponse>> getPublicDocuments(

            @RequestParam(required = false) String query,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) Integer semester,

            @PageableDefault(size = 20, sort = "createdAt")
            Pageable pageable
    ) {

        return ResponseEntity.ok(
            documentService.getPublicDocuments(
                query, subject, semester, pageable
            )
        );
    }

    @GetMapping("/my")
    public ResponseEntity<Page<DocumentResponse>> getMyDocuments(
            Authentication authentication,

            @PageableDefault(size = 20, sort = "createdAt")
            Pageable pageable
    ) {

        return ResponseEntity.ok(
            documentService.getMyDocuments(
                authentication.getName(), pageable
            )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponse> getDocument(
            @PathVariable UUID id,
            Authentication authentication
    ) {

        String email = authentication == null
            ? null
            : authentication.getName();

        return ResponseEntity.ok(
            documentService.getDocument(id, email)
        );
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable UUID id,
            Authentication authentication
    ) {

        return serveFile(id, authentication, true);
    }

    @GetMapping("/{id}/preview")
    public ResponseEntity<Resource> previewDocument(
            @PathVariable UUID id,
            Authentication authentication
    ) {

        return serveFile(id, authentication, false);
    }

    private ResponseEntity<Resource> serveFile(
            UUID id,
            Authentication authentication,
            boolean attachment
    ) {

        String email = authentication == null
            ? null
            : authentication.getName();

        Path path = documentService.getDocumentFile(id, email);

        Resource resource = new FileSystemResource(path);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_PDF);

        ContentDisposition disposition = attachment
            ? ContentDisposition.attachment()
                .filename(path.getFileName().toString())
                .build()
            : ContentDisposition.inline()
                .filename(path.getFileName().toString())
                .build();

        headers.setContentDisposition(disposition);

        return ResponseEntity.ok()
            .headers(headers)
            .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable UUID id,
            Authentication authentication
    ) {

        documentService.deleteDocument(
            id, authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }
}
