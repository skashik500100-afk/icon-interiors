package com.iconinteriors.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "designs")
public class Design {

    @Id
    @Column(length = 50)
    private String id; // e.g. 'BED-001'

    @Column(nullable = false, length = 200)
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "category_name", nullable = false, length = 80)
    private String categoryName;

    @Column(nullable = false, length = 80)
    private String style;

    @Column(name = "budget_tier", nullable = false, length = 50)
    private String budgetTier; // Essential, Signature, Couture, Luxury

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl = "";

    @Column(name = "lead_description", columnDefinition = "TEXT")
    private String leadDescription;

    @Column(length = 100)
    private String dimensions;

    @Column(name = "handover_timeline", length = 100)
    private String handoverTimeline;

    @Column(name = "warranty_terms", length = 100)
    private String warrantyTerms;

    @Column(name = "materials_json", columnDefinition = "TEXT")
    private String materialsJson;

    @Column(name = "is_featured")
    private Boolean featured = false;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Design() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }

    public String getBudgetTier() { return budgetTier; }
    public void setBudgetTier(String budgetTier) { this.budgetTier = budgetTier; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLeadDescription() { return leadDescription; }
    public void setLeadDescription(String leadDescription) { this.leadDescription = leadDescription; }

    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }

    public String getHandoverTimeline() { return handoverTimeline; }
    public void setHandoverTimeline(String handoverTimeline) { this.handoverTimeline = handoverTimeline; }

    public String getWarrantyTerms() { return warrantyTerms; }
    public void setWarrantyTerms(String warrantyTerms) { this.warrantyTerms = warrantyTerms; }

    public String getMaterialsJson() { return materialsJson; }
    public void setMaterialsJson(String materialsJson) { this.materialsJson = materialsJson; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

