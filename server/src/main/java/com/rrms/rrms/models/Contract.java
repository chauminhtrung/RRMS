package com.rrms.rrms.models;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @Column(columnDefinition = "DATE")
    private LocalDate firstTime;

    @Column(columnDefinition = "INT")
    private Integer leaseTerm;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private BigDecimal deposit;

    @Column(columnDefinition = "TEXT")
    private String collection_cycle;

    @Column(columnDefinition = "DATE")
    private LocalDate createdate;

    @Column(columnDefinition = "TEXT")
    private LocalDate Sign_contract;

    @Column(columnDefinition = "TEXT")
    private LocalDate language;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'ENDED')")
    private ContractStatus status;
}
