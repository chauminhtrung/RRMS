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
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomId;

    @ManyToOne
    @JoinColumn(name = "motelId")
    private Motel motel;

    @ManyToOne
    @JoinColumn(name = "typeRoomId")
    private TypeRoom typeRoom;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long price;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long roomArea;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean available;

    @Column(columnDefinition = "TEXT")
    private String description;
}
