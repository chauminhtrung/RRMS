package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rental_amenities")
@Builder
public class RentalAmenities {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID RentalAmenitiesId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String name;
}
