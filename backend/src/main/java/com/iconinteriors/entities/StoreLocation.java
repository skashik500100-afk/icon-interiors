package com.iconinteriors.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "store_locations")
public class StoreLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "studio_name", nullable = false, length = 150)
    private String studioName;

    @Column(name = "is_physical_flagship")
    private Boolean physicalFlagship = true;

    @Column(name = "address_line", columnDefinition = "TEXT", nullable = false)
    private String addressLine;

    @Column(nullable = false, length = 80)
    private String city;

    @Column(nullable = false, length = 80)
    private String state;

    @Column(nullable = false, length = 20)
    private String pincode;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(name = "whatsapp_number", nullable = false, length = 30)
    private String whatsappNumber;

    @Column(name = "visiting_hours", length = 120)
    private String visitingHours;

    @Column(name = "google_maps_url", columnDefinition = "TEXT")
    private String googleMapsUrl;

    public StoreLocation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudioName() { return studioName; }
    public void setStudioName(String studioName) { this.studioName = studioName; }

    public Boolean getPhysicalFlagship() { return physicalFlagship; }
    public void setPhysicalFlagship(Boolean physicalFlagship) { this.physicalFlagship = physicalFlagship; }

    public String getAddressLine() { return addressLine; }
    public void setAddressLine(String addressLine) { this.addressLine = addressLine; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public String getVisitingHours() { return visitingHours; }
    public void setVisitingHours(String visitingHours) { this.visitingHours = visitingHours; }

    public String getGoogleMapsUrl() { return googleMapsUrl; }
    public void setGoogleMapsUrl(String googleMapsUrl) { this.googleMapsUrl = googleMapsUrl; }
}

