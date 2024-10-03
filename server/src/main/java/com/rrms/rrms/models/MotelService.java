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
@Table(name = "motel_services")
public class MotelService {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID motelServiceId;

    @ManyToOne
    @JoinColumn(name = "motelId")
    private Motel motel;

    @ManyToOne
    @JoinColumn(name = "nameMotelServiceId")
    private NameMotelService nameMotelService;
}
