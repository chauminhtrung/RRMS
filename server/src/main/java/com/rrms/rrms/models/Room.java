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

    @Column(name = "name_room", columnDefinition = "NVARCHAR(255)")
    private String name;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double price;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    @Column(name = "prioritize", columnDefinition = "TEXT")
    private String prioritize;

    @Column(name = "area", columnDefinition = "INT")
    private Integer area;

    // cai nay thuong nam o hop dong
    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double debt;

    // cai nay thuong nam o hop dong
    @Column(name = "count_tenant", columnDefinition = "TEXT")
    private Integer countTenant;

    @Column(name = "invoice_date", columnDefinition = "TEXT")
    private Integer invoiceDate;

    // cai nay thuong nam o hop dong
    @Column(name = "payment_circle", columnDefinition = "INT")
    private Integer paymentCircle;

    @Column(name = "move_in_date", columnDefinition = "DATE")
    private Date moveInDate;

    @Column(name = "contract_duration", columnDefinition = "DATE")
    private Date contractduration;

    @Column(name = "status", columnDefinition = "BOOLEAN")
    private Boolean status;

    @Column(name = "finance", columnDefinition = "TEXT")
    private String finance;
}
