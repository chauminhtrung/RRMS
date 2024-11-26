package com.rrms.rrms.models;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID invoiceId;

    @Column(columnDefinition = "DATE")
    private LocalDate invoice_createMonth;

    @Column(columnDefinition = "DATE")
    private LocalDate invoice_createDate;

    @Column(columnDefinition = "DATE")
    private LocalDate invoice_dueDate;

    @Column(columnDefinition = "VARCHAR(50)")
    private String status;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;
}
