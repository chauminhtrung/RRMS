package com.rrms.rrms.models;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference(value = "motel-service") // Đặt tên cho tham chiếu ngược
    private Motel motel;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String nameService;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Long price;

    @Column(columnDefinition = "VARCHAR(255)")
    private String chargetype;
}
