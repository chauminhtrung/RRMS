package com.rrms.rrms.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "brokers")
public class Broker {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID brokerId;
    private String name;
    private String phone;
    private UUID motelId;
    private int commissionRate;
}
