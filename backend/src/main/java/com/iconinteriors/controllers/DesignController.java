package com.iconinteriors.controllers;

import com.iconinteriors.dto.ApiResponse;
import com.iconinteriors.entities.Design;
import com.iconinteriors.services.DesignService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/designs")
public class DesignController {

    private final DesignService designService;

    public DesignController(DesignService designService) {
        this.designService = designService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Design>>> getDesigns(
            @RequestParam(required = false, defaultValue = "All") String category,
            @RequestParam(required = false, defaultValue = "All") String style,
            @RequestParam(required = false, defaultValue = "All") String budget,
            @RequestParam(required = false, defaultValue = "") String query) {

        List<Design> results = designService.filterDesigns(category, style, budget, query);
        return ResponseEntity.ok(ApiResponse.ok(results));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Design>>> getFeaturedDesigns() {
        return ResponseEntity.ok(ApiResponse.ok(designService.getFeaturedDesigns()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Design>> getDesignById(@PathVariable String id) {
        return designService.getDesignById(id)
                .map(d -> ResponseEntity.ok(ApiResponse.ok(d)))
                .orElse(ResponseEntity.notFound().build());
    }
}

