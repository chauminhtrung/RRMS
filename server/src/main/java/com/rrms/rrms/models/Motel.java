package com.rrms.rrms.models;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Column(columnDefinition = "NVARCHAR(255)")
    private String methodofcreation;

    @Column(columnDefinition = "INT")
    private int maxperson;

    @Column(columnDefinition = "INT")
    private int invoicedate;

    @Column(columnDefinition = "INT")
    private int paymentdeadline;

    @ManyToOne
    @JoinColumn(name = "username")
    @JsonBackReference(value = "account-motel") // Đặt tên cho tham chiếu ngược
    private Account account;

    @ManyToOne
    @JoinColumn(name = "type_room_id", nullable = false)
    private TypeRoom typeRoom;

    // de xoa motell xoa luon dich vu
    @OneToMany(mappedBy = "motel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "motel-service") // Đặt tên cho tham chiếu quản lý
    private List<MotelService> motelServices;

    @OneToMany(mappedBy = "motel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "motel-Room") // Đặt tên cho tham chiếu quản lý
    private List<Room> rooms;

    @OneToMany(mappedBy = "motel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "motel-ContractTemplate") // Đặt tên cho tham chiếu quản lý
    private List<ContractTemplate> contractTemplates;

}
