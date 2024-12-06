package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "contract_services")
public class ContractService {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contractServiceId;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    @JsonBackReference
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private MotelService service;
}
