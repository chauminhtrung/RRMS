package com.rrms.rrms.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.RentalAmenities;

public interface RentalAmenitiesRepository extends JpaRepository<RentalAmenities, UUID> {
    Optional<RentalAmenities> findByName(String name);
}
