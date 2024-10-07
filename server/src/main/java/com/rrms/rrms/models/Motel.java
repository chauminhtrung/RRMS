package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "motels")
public class Motel {

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID motelId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String motelName;

    @Column(columnDefinition = "DOUBLE")
    private Double area;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Long averagePrice;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String address;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;
}
