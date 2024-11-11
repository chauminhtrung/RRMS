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
@Table(name = "room_devices")
public class RoomDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomDeviceId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "motelDevice_id")
    private MotelDevice motelDevice;

    @Column(columnDefinition = "INT")
    private int quantity;
}
