package com.iconinteriors.dto;

import jakarta.validation.constraints.NotBlank;

public class EnquiryRequest {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String email;
    private String city = "Guntur, AP";
    private String roomType;
    private String budgetRange;
    private String notes;
    private String source = "WEBSITE_CONSULTATION";
    private String designId;

    public EnquiryRequest() {}

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
}

