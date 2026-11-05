package com.iconinteriors.controllers;

import com.iconinteriors.dto.ApiResponse;
import com.iconinteriors.entities.Quotation;
import com.iconinteriors.repositories.QuotationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/estimator")
public class EstimatorController {

    private final QuotationRepository quotationRepository;

    public EstimatorController(QuotationRepository quotationRepository) {
        this.quotationRepository = quotationRepository;
    }

    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<Map<String, Object>>> calculateEstimate(@RequestBody Map<String, Object> req) {
        int sqft = (req.get("sqft") instanceof Number) ? ((Number) req.get("sqft")).intValue() : 1850;
        String grade = req.getOrDefault("grade", "signature").toString().toLowerCase();

        int ratePerSqft = switch (grade) {
            case "couture" -> 2850;
            case "essential" -> 1450;
            default -> 1950;
        };

        long baseCost = (long) sqft * ratePerSqft;
        long lowEstimate = Math.round(baseCost * 0.95);
        long highEstimate = Math.round(baseCost * 1.08);

        Map<String, Object> responseData = Map.of(
                "sqft", sqft,
                "grade", grade,
                "ratePerSqft", ratePerSqft,
                "estimatedLowInr", lowEstimate,
                "estimatedHighInr", highEstimate,
                "lowFormatted", String.format("₹%.2f Lakhs", lowEstimate / 100000.0),
                "highFormatted", String.format("₹%.2f Lakhs", highEstimate / 100000.0),
                "timeline", grade.equals("couture") ? "60 Days" : (grade.equals("signature") ? "45 Days" : "35 Days"),
                "warranty", "10-Year Comprehensive Warranty"
        );

        return ResponseEntity.ok(ApiResponse.ok(responseData));
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse<Quotation>> saveQuotation(@RequestBody Map<String, Object> req) {
        Quotation quote = new Quotation();
        quote.setCustomerName((String) req.getOrDefault("customerName", "Guest Homeowner"));
        quote.setPhone((String) req.getOrDefault("phone", ""));
        quote.setEmail((String) req.getOrDefault("email", ""));
        quote.setBhkType((String) req.getOrDefault("bhkType", "3 BHK"));
        quote.setBuiltupSqft(((Number) req.getOrDefault("sqft", 1850)).intValue());
        quote.setPackageGrade((String) req.getOrDefault("grade", "Signature Architectural"));
        quote.setRatePerSqft(((Number) req.getOrDefault("ratePerSqft", 1950)).intValue());

        if (req.containsKey("lowInr")) {
            quote.setEstimatedLowInr(new BigDecimal(req.get("lowInr").toString()));
        }
        if (req.containsKey("highInr")) {
            quote.setEstimatedHighInr(new BigDecimal(req.get("highInr").toString()));
        }

        Quotation saved = quotationRepository.save(quote);
        return ResponseEntity.ok(ApiResponse.ok("Quote registered", saved));
    }
}

