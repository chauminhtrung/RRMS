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
    @JoinColumn(name = "motel_id")
    private Motel motel;

    @ManyToOne
    @JoinColumn(name = "name_motel_service_id")
    private NameMotelService nameMotelService;
}
