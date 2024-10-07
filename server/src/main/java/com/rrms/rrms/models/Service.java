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
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID serviceId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String typeService;

    @Column(columnDefinition = "VARCHAR(255)")
    private String nameService;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long price;
}
