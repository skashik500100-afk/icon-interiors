package com.iconinteriors.services;

import com.iconinteriors.dto.EnquiryRequest;
import com.iconinteriors.entities.Enquiry;
import com.iconinteriors.repositories.EnquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public Enquiry createEnquiry(EnquiryRequest req) {
        Enquiry enquiry = new Enquiry();
        enquiry.setCustomerName(req.getCustomerName());
        enquiry.setPhone(req.getPhone());
        enquiry.setEmail(req.getEmail());
        enquiry.setCity(req.getCity() != null ? req.getCity() : "Guntur, AP");
        enquiry.setRoomType(req.getRoomType());
        enquiry.setBudgetRange(req.getBudgetRange());
        enquiry.setNotes(req.getNotes());
        enquiry.setSource(req.getSource() != null ? req.getSource() : "WEBSITE_CONSULTATION");
        enquiry.setDesignId(req.getDesignId());
        enquiry.setStatus("NEW");

        return enquiryRepository.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Enquiry> getEnquiryById(Long id) {
        return enquiryRepository.findById(id);
    }

    public Enquiry updateStatus(Long id, String newStatus) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found with ID: " + id));
        enquiry.setStatus(newStatus);
        return enquiryRepository.save(enquiry);
    }
}

