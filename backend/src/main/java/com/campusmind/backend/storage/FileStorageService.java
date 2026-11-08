package com.campusmind.backend.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path storageLocation;

    public FileStorageService(
            @Value("${app.storage.location:uploads}") String location
    ) {
        this.storageLocation = Paths.get(location)
                .toAbsolutePath()
                .normalize();
    }

    @PostConstruct
    public void initialize() {

        try {
            Files.createDirectories(storageLocation);
        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not initialize file storage", e
            );
        }
    }

    public String storeFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a PDF file");
        }

        if (file.getOriginalFilename() == null
                || !file.getOriginalFilename()
                .toLowerCase()
                .endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        if (file.getSize() > 25L * 1024 * 1024) {
            throw new IllegalArgumentException(
                    "PDF size cannot exceed 25 MB"
            );
        }

        try (InputStream input = new BufferedInputStream(file.getInputStream())) {

            byte[] signature = input.readNBytes(5);

            if (!"%PDF-".equals(new String(signature,
                    java.nio.charset.StandardCharsets.US_ASCII))) {
                throw new IllegalArgumentException(
                        "Invalid PDF file content"
                );
            }

        } catch (IOException e) {
            throw new RuntimeException("Could not validate PDF", e);
        }

        String storedFileName = UUID.randomUUID() + ".pdf";

        Path destination = storageLocation
                .resolve(storedFileName)
                .normalize();

        if (!destination.startsWith(storageLocation)) {
            throw new IllegalArgumentException("Invalid file path");
        }

        try (InputStream input = file.getInputStream()) {

            Files.copy(input, destination);

            return storedFileName;

        } catch (IOException e) {
            throw new RuntimeException("Could not save PDF file", e);
        }
    }

    public Path getFilePath(String storedFileName) {

        Path path = storageLocation
                .resolve(storedFileName)
                .normalize();

        if (!path.startsWith(storageLocation)) {
            throw new IllegalArgumentException("Invalid file path");
        }

        return path;
    }

    public void deleteFile(String storedFileName) {

        try {
            Files.deleteIfExists(getFilePath(storedFileName));
        } catch (IOException e) {
            throw new RuntimeException("Could not delete PDF file", e);
        }
    }
}