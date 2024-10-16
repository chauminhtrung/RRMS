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
@Table(name = "room_images")
@Builder
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomImageId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(columnDefinition = "VARCHAR(255)")
    private String image;
}
