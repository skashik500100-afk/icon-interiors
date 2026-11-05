package com.iconinteriors.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "ICON INTERIORS API",
            "timestamp", Instant.now().toString()
        ));
    }

    @GetMapping("/api/v1/health")
    public ResponseEntity<Map<String, Object>> getV1Health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "ICON INTERIORS API",
            "version", "1.0.0",
            "timestamp", Instant.now().toString()
        ));
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> getRoot() {
        return ResponseEntity.ok(Map.of(
            "service", "ICON INTERIORS Architecture & Living Backend API",
            "status", "UP",
            "healthCheck", "/api/health",
            "catalog", "/api/v1/designs"
        ));
    }
}

