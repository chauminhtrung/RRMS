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
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID deviceId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String deviceName;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean available;
}
