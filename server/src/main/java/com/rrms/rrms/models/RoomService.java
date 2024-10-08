package com.rrms.rrms.models;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_services")
public class RoomService {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomServiceId;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    @JsonBackReference
    private Room room;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
}
