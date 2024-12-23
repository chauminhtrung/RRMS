package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import com.rrms.rrms.enums.Unit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "motel_device")
public class MotelDevice {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID motel_device_id;

    @ManyToOne
    @JoinColumn(name = "motel_id")
    private Motel motel;

    @Column(columnDefinition = "VARCHAR(255)")
    private String deviceName;

    private String icon;

    @Column(name = "`value`")
    private Double value;

    private Double valueInput;
    private int totalQuantity;
    private int totalUsing;
    private int totalNull;
    private String supplier;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit")
    private Unit unit;
}
