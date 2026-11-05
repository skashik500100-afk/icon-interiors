package com.iconinteriors.controllers;

import com.iconinteriors.dto.ApiResponse;
import com.iconinteriors.dto.EnquiryRequest;
import com.iconinteriors.entities.Enquiry;
import com.iconinteriors.services.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Enquiry>> submitEnquiry(@Valid @RequestBody EnquiryRequest request) {
        Enquiry saved = enquiryService.createEnquiry(request);
        return ResponseEntity.ok(ApiResponse.ok("Consultation enquiry registered successfully. Our studio team will reach out within 2 business hours.", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Enquiry>>> getAllEnquiries() {
        return ResponseEntity.ok(ApiResponse.ok(enquiryService.getAllEnquiries()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Enquiry>> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Enquiry updated = enquiryService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Status updated", updated));
    }
}

