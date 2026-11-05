package com.iconinteriors.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enquiries")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enquiry_code", nullable = false, unique = true, length = 50)
    private String enquiryCode;

    @Column(name = "customer_name", nullable = false, length = 120)
    private String customerName;

    @Column(nullable = false, length = 25)
    private String phone;

    @Column(length = 180)
    private String email;

    @Column(length = 100)
    private String city = "Guntur, AP";

    @Column(name = "room_type", length = 100)
    private String roomType;

    @Column(name = "budget_range", length = 80)
    private String budgetRange;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(length = 50)
    private String source = "WEBSITE_CONSULTATION";

    @Column(name = "design_id", length = 50)
    private String designId;

    @Column(nullable = false, length = 50)
    private String status = "NEW"; // NEW, IN_REVIEW, IN_PROGRESS, COMPLETED

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Enquiry() {}

    @PrePersist
    public void onPrePersist() {
        if (this.enquiryCode == null || this.enquiryCode.isEmpty()) {
            this.enquiryCode = "ENQ-" + System.currentTimeMillis() % 1000000;
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEnquiryCode() { return enquiryCode; }
    public void setEnquiryCode(String enquiryCode) { this.enquiryCode = enquiryCode; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getBudgetRange() { return budgetRange; }
    public void setBudgetRange(String budgetRange) { this.budgetRange = budgetRange; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDesignId() { return designId; }
    public void setDesignId(String designId) { this.designId = designId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

