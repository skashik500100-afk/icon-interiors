package com.iconinteriors.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quote_ref", nullable = false, unique = true, length = 60)
    private String quoteRef;

    @Column(name = "customer_name", length = 120)
    private String customerName;

    @Column(length = 25)
    private String phone;

    @Column(length = 180)
    private String email;

    @Column(name = "bhk_type", nullable = false, length = 50)
    private String bhkType;

    @Column(name = "builtup_sqft", nullable = false)
    private Integer builtupSqft;

    @Column(name = "package_grade", nullable = false, length = 80)
    private String packageGrade;

    @Column(name = "rate_per_sqft", nullable = false)
    private Integer ratePerSqft;

    @Column(name = "selected_rooms_json", columnDefinition = "TEXT")
    private String selectedRoomsJson;

    @Column(name = "estimated_low_inr", precision = 14, scale = 2)
    private BigDecimal estimatedLowInr;

    @Column(name = "estimated_high_inr", precision = 14, scale = 2)
    private BigDecimal estimatedHighInr;

    @Column(name = "handover_days")
    private Integer handoverDays = 45;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Quotation() {}

    @PrePersist
    public void onPrePersist() {
        if (this.quoteRef == null || this.quoteRef.isEmpty()) {
            this.quoteRef = "QUO-" + (bhkType != null ? bhkType.replaceAll("\\s+", "") : "CST") + "-" + (System.currentTimeMillis() % 100000);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuoteRef() { return quoteRef; }
    public void setQuoteRef(String quoteRef) { this.quoteRef = quoteRef; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBhkType() { return bhkType; }
    public void setBhkType(String bhkType) { this.bhkType = bhkType; }

    public Integer getBuiltupSqft() { return builtupSqft; }
    public void setBuiltupSqft(Integer builtupSqft) { this.builtupSqft = builtupSqft; }

    public String getPackageGrade() { return packageGrade; }
    public void setPackageGrade(String packageGrade) { this.packageGrade = packageGrade; }

    public Integer getRatePerSqft() { return ratePerSqft; }
    public void setRatePerSqft(Integer ratePerSqft) { this.ratePerSqft = ratePerSqft; }

    public String getSelectedRoomsJson() { return selectedRoomsJson; }
    public void setSelectedRoomsJson(String selectedRoomsJson) { this.selectedRoomsJson = selectedRoomsJson; }

    public BigDecimal getEstimatedLowInr() { return estimatedLowInr; }
    public void setEstimatedLowInr(BigDecimal estimatedLowInr) { this.estimatedLowInr = estimatedLowInr; }

    public BigDecimal getEstimatedHighInr() { return estimatedHighInr; }
    public void setEstimatedHighInr(BigDecimal estimatedHighInr) { this.estimatedHighInr = estimatedHighInr; }

    public Integer getHandoverDays() { return handoverDays; }
    public void setHandoverDays(Integer handoverDays) { this.handoverDays = handoverDays; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

