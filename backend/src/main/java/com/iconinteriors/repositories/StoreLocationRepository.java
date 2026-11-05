package com.iconinteriors.repositories;

import com.iconinteriors.entities.StoreLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreLocationRepository extends JpaRepository<StoreLocation, Long> {
    Optional<StoreLocation> findByPhysicalFlagshipTrue();
}

