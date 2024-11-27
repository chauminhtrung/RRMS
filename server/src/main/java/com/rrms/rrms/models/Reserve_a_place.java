package com.rrms.rrms.models;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.rrms.rrms.enums.ContractStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ReserveAPlace")
public class Reserve_a_place {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID ReserveaplaceId;

    // ngay coc giua cho
    @Column(columnDefinition = "DATE")
    private Date createdate;

    // Ngay du kien vao o
    @Column(columnDefinition = "DATE")
    private Date moveinDate;

    // ten nguoi thue
    @Column(columnDefinition = "TEXT")
    private String nametenant;

    // so dien thoai nguoi thue
    @Column(columnDefinition = "TEXT")
    private String phonetenant;

    // so tien coc giua cho
    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    // thoi han hop dong
    @Column(columnDefinition = "TEXT")
    private String note;

    // trang thai hop dong
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'ENDED','IATExpire','Stake')")
    private ContractStatus status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    @JsonBackReference(value = "Room-ReserveAPlace") // Đặt tên cho tham chiếu ngược
    private Room room;
}
