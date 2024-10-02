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
@Table(name = "name_motel_services")
public class NameMotelService {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID nameMotelServicesId;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String typeService;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String nameService;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Long price;
}
