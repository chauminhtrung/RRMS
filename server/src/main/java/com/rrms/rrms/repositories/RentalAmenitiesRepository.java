package com.rrms.rrms.repositories;

import com.rrms.rrms.models.RentalAmenities;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RentalAmenitiesRepository extends JpaRepository<RentalAmenities, UUID> {
}