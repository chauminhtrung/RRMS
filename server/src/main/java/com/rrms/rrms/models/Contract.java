package com.rrms.rrms.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.*;

import com.rrms.rrms.enums.ContractStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contractId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "username_tenant")
    private Tenant tenant;

    @ManyToOne
    @JoinColumn(name = "username_landlord")
    private Account landlord;

    @ManyToOne
    @JoinColumn(name = "contract_template")
    private ContractTemplate contract_template;

    @ManyToOne
    @JoinColumn(name = "broker_id")
    private Broker broker;

    //Ngay vao o
    @Column(columnDefinition = "DATE")
    private Date moveinDate;

    //thoi han hop dong
    @Column(columnDefinition = "TEXT")
    private String leaseTerm;

    //Ngay ket thuc hop dong
    @Column(columnDefinition = "DATE")
    private Date closeContract;

    //mo ta
    @Column(columnDefinition = "TEXT")
    private String description;

    //tien no
    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double debt;

    //gia tien
    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double price;

    //tien coc
    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    //chu ky thu
    @Column(columnDefinition = "TEXT")
    private String collection_cycle;

    //ngay lap hop dong
    @Column(columnDefinition = "DATE")
    private LocalDate createdate;

    //chu ky khach hang
    @Column(columnDefinition = "TEXT")
    private String Sign_contract;

    //ngon ngu
    @Column(columnDefinition = "TEXT")
    private LocalDate language;

    //so luong nguoi thue
    @Column(name = "count_tenant", columnDefinition = "TEXT")
    private Integer countTenant;

    //trang thai hop dong
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'ENDED','IATExpire')")
    private ContractStatus status;
}
