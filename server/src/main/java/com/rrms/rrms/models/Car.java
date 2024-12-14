package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID carId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonBackReference(value = "Room-Contract") // Đặt tên cho tham chiếu ngược
    private Room room;

    @Column(columnDefinition = "TEXT")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String number;

    @Column(columnDefinition = "TEXT")
    private String image;
}
