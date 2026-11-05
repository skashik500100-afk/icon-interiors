package com.iconinteriors.repositories;

import com.iconinteriors.entities.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    Optional<Enquiry> findByEnquiryCode(String enquiryCode);
    List<Enquiry> findByStatus(String status);
    List<Enquiry> findByPhoneOrderByCreatedAtDesc(String phone);
    List<Enquiry> findAllByOrderByCreatedAtDesc();
}

