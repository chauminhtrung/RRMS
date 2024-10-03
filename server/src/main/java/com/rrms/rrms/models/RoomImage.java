package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_images")
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomImageId;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    @Column(columnDefinition = "VARCHAR(255)")
    private String fileName;

    @Column(columnDefinition = "TEXT")
    private String linkImg;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean mainImg;
}
