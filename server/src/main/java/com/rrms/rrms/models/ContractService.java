package com.rrms.rrms.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
