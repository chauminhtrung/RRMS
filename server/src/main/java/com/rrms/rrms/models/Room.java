package com.rrms.rrms.models;

import java.util.Date;
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
@Table(name = "rooms")
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomId;

    @ManyToOne
    @JoinColumn(name = "motel_id", nullable = false)
    private Motel motel;

    @Column(name = "room_group", columnDefinition = "NVARCHAR(255)")
    private String group;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double price;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    @Column(name = "count_tenant", columnDefinition = "TEXT")
    private Integer countTenant;

    @Column(name = "invoice_date", columnDefinition = "DATE")
    private Date invoiceDate;

    @Column(name = "payment_circle", columnDefinition = "INT")
    private Integer paymentCircle;

    @Column(name = "move_in_date", columnDefinition = "DATE")
    private Date moveInDate;

    @Column(name = "contract_duration", columnDefinition = "NVARCHAR(255)")
    private String contractduration;

    @Column(name = "status", columnDefinition = "BOOLEAN")
    private Boolean status;

    @Column(name = "finance", columnDefinition = "TEXT")
    private String finance;
}
