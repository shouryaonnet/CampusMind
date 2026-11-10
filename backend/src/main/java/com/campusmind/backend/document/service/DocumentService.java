
package com.campusmind.backend.document.service;

import com.campusmind.backend.document.dto.DocumentResponse;
import com.campusmind.backend.document.entity.*;
import com.campusmind.backend.document.repository.DocumentRepository;
import com.campusmind.backend.storage.FileStorageService;
import com.campusmind.backend.user.entity.User;
import com.campusmind.backend.user.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public DocumentService(
            DocumentRepository documentRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService
    ) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "User not found"
                ));
    }

    @Transactional
    public DocumentResponse uploadDocument(
            MultipartFile file,
            String title,
            String description,
            String subject,
            Integer semester,
            String academicYear,
            DocumentType documentType,
            DocumentVisibility visibility,
            String email
    ) {

        // Validate PDF file
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please upload a PDF file"
            );
        }

        if (file.getSize() > 25L * 1024 * 1024) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "PDF file size must not exceed 25 MB"
            );
        }

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only PDF files are allowed"
            );
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null
                || !originalFilename.toLowerCase().endsWith(".pdf")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "File must have a .pdf extension"
            );
        }

        // Validate document metadata
        if (title == null || title.isBlank()
                || title.length() > 200) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Title is required and must not exceed 200 characters"
            );
        }

        if (subject == null || subject.isBlank()
                || subject.length() > 100) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Subject is required and must not exceed 100 characters"
            );
        }

        if (semester == null || semester < 1 || semester > 12) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Semester must be between 1 and 12"
            );
        }

        if (academicYear == null || academicYear.isBlank()
                || academicYear.length() > 20) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Academic year is required"
            );
        }

        if (documentType == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Document type is required"
            );
        }

        User user = getUser(email);

        String storedFileName = fileStorageService.storeFile(file);

        try {

            Document document = new Document();

            document.setTitle(title.trim());
            document.setDescription(description);
            document.setSubject(subject.trim());
            document.setSemester(semester);
            document.setAcademicYear(academicYear.trim());
            document.setDocumentType(documentType);

            document.setVisibility(
                    visibility == null
                            ? DocumentVisibility.PUBLIC
                            : visibility
            );

            document.setOriginalFileName(
                    Path.of(originalFilename)
                            .getFileName()
                            .toString()
            );

            document.setStoredFileName(storedFileName);
            document.setStoragePath(storedFileName);
            document.setContentType("application/pdf");
            document.setFileSize(file.getSize());
            document.setUploadedBy(user);

            Document saved = documentRepository.save(document);

            return DocumentResponse.from(saved);

        } catch (RuntimeException e) {

            fileStorageService.deleteFile(storedFileName);
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public Page<DocumentResponse> getPublicDocuments(
            String query,
            String subject,
            Integer semester,
            Pageable pageable
    ) {

        return documentRepository.searchPublicDocuments(
                DocumentVisibility.PUBLIC,
                normalize(query),
                normalize(subject),
                semester,
                pageable
        ).map(DocumentResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<DocumentResponse> getMyDocuments(
            String email,
            Pageable pageable
    ) {

        User user = getUser(email);

        return documentRepository.findByUploadedBy(user, pageable)
                .map(DocumentResponse::from);
    }

    @Transactional(readOnly = true)
    public DocumentResponse getDocument(UUID id, String email) {

        Document document = getDocumentOrThrow(id);

        verifyAccess(document, email);

        return DocumentResponse.from(document);
    }

    public Path getDocumentFile(UUID id, String email) {

        Document document = getDocumentOrThrow(id);

        verifyAccess(document, email);

        Path path = fileStorageService.getFilePath(
                document.getStoredFileName()
        );

        if (!Files.exists(path)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "PDF file not found in storage"
            );
        }

        return path;
    }

    @Transactional
    public void deleteDocument(UUID id, String email) {

        User user = getUser(email);

        Document document = documentRepository.findByIdAndUploadedBy(
                id, user
        ).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Document not found or you are not its owner"
        ));

        String storedFileName = document.getStoredFileName();

        documentRepository.delete(document);

        fileStorageService.deleteFile(storedFileName);
    }

    private Document getDocumentOrThrow(UUID id) {

        return documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Document not found"
                ));
    }

    private void verifyAccess(Document document, String email) {

        if (document.getVisibility() == DocumentVisibility.PUBLIC) {
            return;
        }

        if (email == null || email.equals("anonymousUser")) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You cannot access this private document"
            );
        }

        User user = getUser(email);

        boolean isOwner = document.getUploadedBy()
                .getId()
                .equals(user.getId());

        boolean isAdmin = user.getRole() != null
                && "ADMIN".equals(user.getRole().name());

        if (!isOwner && !isAdmin) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You cannot access this private document"
            );
        }
    }

    private String normalize(String value) {

        return value == null || value.isBlank()
                ? null
                : value.trim();
    }
}
