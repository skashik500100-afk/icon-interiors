package com.iconinteriors.controllers;

import com.iconinteriors.dto.ApiResponse;
import com.iconinteriors.entities.Design;
import com.iconinteriors.services.DesignService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final DesignService designService;

    public AdminController(DesignService designService) {
        this.designService = designService;
    }

    @PostMapping("/designs")
    public ResponseEntity<ApiResponse<Design>> createOrUpdateDesign(@RequestBody Design design) {
        Design saved = designService.saveOrUpdateDesign(design);
        return ResponseEntity.ok(ApiResponse.ok("Design saved successfully", saved));
    }

    @GetMapping("/designs/next-id")
    public ResponseEntity<ApiResponse<Map<String, String>>> getNextDesignId(@RequestParam(defaultValue = "Living Room") String category) {
        String nextId = designService.generateUniqueDesignId(category);
        return ResponseEntity.ok(ApiResponse.ok("Generated unique design ID", Map.of("id", nextId)));
    }

    @DeleteMapping("/designs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDesign(@PathVariable String id) {
        designService.deleteDesign(id);
        return ResponseEntity.ok(ApiResponse.ok("Design deleted successfully", null));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("File is empty"));
        }

        try {
            String uploadDir = "uploads/designs";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String originalName = file.getOriginalFilename();
            String extension = (originalName != null && originalName.contains("."))
                    ? originalName.substring(originalName.lastIndexOf("."))
                    : ".jpg";

            String fileName = "design_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8) + extension;
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String publicUrl = "/uploads/designs/" + fileName;
            return ResponseEntity.ok(ApiResponse.ok("Image uploaded successfully", Map.of("url", publicUrl, "fileName", fileName)));
        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to upload image: " + ex.getMessage()));
        }
    }

    @PostMapping("/designs/{id}/upload-photo")
    public ResponseEntity<ApiResponse<Design>> uploadDesignPhoto(
            @PathVariable String id,
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("File is empty"));
        }

        Design design = designService.getDesignById(id)
                .orElseThrow(() -> new RuntimeException("Design not found: " + id));

        try {
            String uploadDir = "uploads/designs";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String originalName = file.getOriginalFilename();
            String extension = (originalName != null && originalName.contains("."))
                    ? originalName.substring(originalName.lastIndexOf("."))
                    : ".jpg";

            String fileName = id.toLowerCase() + "_" + System.currentTimeMillis() + extension;
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String publicUrl = "/uploads/designs/" + fileName;
            design.setImageUrl(publicUrl);
            Design updated = designService.saveOrUpdateDesign(design);

            return ResponseEntity.ok(ApiResponse.ok("Design photograph uploaded successfully", updated));
        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to upload image: " + ex.getMessage()));
        }
    }
}

