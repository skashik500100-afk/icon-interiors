package com.iconinteriors.controllers;

import com.iconinteriors.dto.ApiResponse;
import com.iconinteriors.entities.StoreLocation;
import com.iconinteriors.repositories.StoreLocationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/store-locations")
public class StoreLocationController {

    private final StoreLocationRepository storeLocationRepository;

    public StoreLocationController(StoreLocationRepository storeLocationRepository) {
        this.storeLocationRepository = storeLocationRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<StoreLocation>>> getAllLocations() {
        List<StoreLocation> locations = storeLocationRepository.findAll();
        return ResponseEntity.ok(ApiResponse.ok(locations));
    }
}

