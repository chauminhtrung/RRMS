package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "invoiceServiceDetail")
public class InvoiceServiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID detailId;

    @Column(columnDefinition = "VARCHAR(50)")
    private String serviceName;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double servicePrice;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double consumption;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;
}
