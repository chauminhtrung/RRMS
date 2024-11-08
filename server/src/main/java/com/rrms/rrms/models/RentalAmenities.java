package com.rrms.rrms.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

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

    @Column(columnDefinition = "VARCHAR(255)", unique = true)
    private String name;
}
