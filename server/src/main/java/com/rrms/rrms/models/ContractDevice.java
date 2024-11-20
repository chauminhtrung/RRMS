package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "contract_devices")
public class ContractDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contractDeviceId;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "motelDevice_id")
    private MotelDevice motelDevice;

    @Column(columnDefinition = "INT")
    private int quantity;
}
