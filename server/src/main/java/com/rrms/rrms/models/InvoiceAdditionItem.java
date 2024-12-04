package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "invoiceAdditionalCharge")
public class InvoiceAdditionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID additionalChargeId;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @Column(columnDefinition = "VARCHAR(255)")
    private String reason;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double amount;

    @Column
    private Boolean isAddition;
}
