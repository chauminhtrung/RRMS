package com.rrms.rrms.models;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference(value = "motel-Room") // Đặt tên cho tham chiếu ngược
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

    //chu ky thu
    @Column(columnDefinition = "TEXT")
    private String collection_cycle;

    @Column(name = "move_in_date", columnDefinition = "DATE")
    private Date moveInDate;

    @Column(name = "contract_duration", columnDefinition = "DATE")
    private Date contractduration;

    @Column(name = "status", columnDefinition = "BOOLEAN")
    private Boolean status;

    @Column(name = "finance", columnDefinition = "TEXT")
    private String finance;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "Room-Contract") // Đặt tên cho tham chiếu quản lý
    private List<Contract> contracts;
}
