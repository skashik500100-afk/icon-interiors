package com.iconinteriors.services;

import com.iconinteriors.entities.Category;
import com.iconinteriors.entities.Design;
import com.iconinteriors.repositories.CategoryRepository;
import com.iconinteriors.repositories.DesignRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesignService {

    private final DesignRepository designRepository;
    private final CategoryRepository categoryRepository;

    public DesignService(DesignRepository designRepository, CategoryRepository categoryRepository) {
        this.designRepository = designRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Design> getAllDesigns() {
        return designRepository.findAll();
    }

    public List<Design> filterDesigns(String category, String style, String budget, String query) {
        String safeCat = (category != null && !category.trim().isEmpty()) ? category : "All";
        String safeStyle = (style != null && !style.trim().isEmpty()) ? style : "All";
        String safeBudget = (budget != null && !budget.trim().isEmpty()) ? budget : "All";
        String safeQuery = (query != null) ? query.trim() : "";

        return designRepository.searchAndFilter(safeCat, safeStyle, safeBudget, safeQuery);
    }

    public Optional<Design> getDesignById(String id) {
        return designRepository.findById(id);
    }

    public List<Design> getFeaturedDesigns() {
        return designRepository.findByFeaturedTrue();
    }

    public String generateUniqueDesignId(String categoryName) {
        String prefix = getCategoryPrefix(categoryName);
        int sequence = 101;
        while (designRepository.existsById(prefix + "-" + sequence) || designRepository.existsById(prefix + "-00" + (sequence - 100))) {
            sequence++;
        }
        return prefix + "-" + sequence;
    }

    private String getCategoryPrefix(String categoryName) {
        if (categoryName == null) return "DSG";
        String lower = categoryName.toLowerCase();
        if (lower.contains("bed")) return "BED";
        if (lower.contains("living")) return "LIV";
        if (lower.contains("kitchen")) return "KIT";
        if (lower.contains("bath")) return "BAT";
        if (lower.contains("dining")) return "DIN";
        if (lower.contains("pooja")) return "POO";
        if (lower.contains("wardrobe")) return "WAR";
        if (lower.contains("ceiling")) return "CEI";
        if (lower.contains("kid")) return "KID";
        if (lower.contains("villa")) return "VIL";
        if (lower.contains("full") || lower.contains("home")) return "HOM";
        return categoryName.length() >= 3 ? categoryName.substring(0, 3).toUpperCase() : "DSG";
    }

    public Design saveOrUpdateDesign(Design design) {
        // Automatically generate ID if null or blank
        if (design.getId() == null || design.getId().trim().isEmpty()) {
            design.setId(generateUniqueDesignId(design.getCategoryName()));
        }

        // Link category entity if category_name is present
        if (design.getCategory() == null && design.getCategoryName() != null) {
            Optional<Category> catOpt = categoryRepository.findByNameIgnoreCase(design.getCategoryName().trim());
            catOpt.ifPresent(design::setCategory);
        }

        return designRepository.save(design);
    }

    public void deleteDesign(String id) {
        designRepository.deleteById(id);
    }
}

