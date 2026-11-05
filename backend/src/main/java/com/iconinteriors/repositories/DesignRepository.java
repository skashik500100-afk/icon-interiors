package com.iconinteriors.repositories;

import com.iconinteriors.entities.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, String> {

    List<Design> findByCategoryNameIgnoreCase(String categoryName);

    List<Design> findByFeaturedTrue();

    @Query("SELECT d FROM Design d WHERE " +
           "(:category = 'All' OR LOWER(d.categoryName) = LOWER(:category)) AND " +
           "(:style = 'All' OR LOWER(d.style) = LOWER(:style)) AND " +
           "(:budget = 'All' OR LOWER(d.budgetTier) = LOWER(:budget)) AND " +
           "(:query = '' OR LOWER(d.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(d.materialsJson) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Design> searchAndFilter(
        @Param("category") String category,
        @Param("style") String style,
        @Param("budget") String budget,
        @Param("query") String query
    );
}

