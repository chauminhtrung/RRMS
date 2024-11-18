package com.rrms.rrms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "bulletinBoards_rentalAms")
@JsonIgnoreProperties({"bulletinBoard"})
@Builder
public class BulletinBoards_RentalAm {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bulletInRentalAId;

    @ManyToOne
    @JoinColumn(name = "rental_amenities_id")
    private RentalAmenities rentalAmenities;

    @ManyToOne
    @JoinColumn(name = "bulletin_boards_id")
    private BulletinBoard bulletinBoard;
}
