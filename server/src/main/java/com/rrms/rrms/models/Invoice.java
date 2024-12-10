package com.rrms.rrms.models;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import com.rrms.rrms.enums.PaymentStatus;
import com.rrms.rrms.services.servicesImp.YearMonthAttributeConverter;

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

    @Column(columnDefinition = "VARCHAR(100)")
    private String invoiceReason;

    @Column(columnDefinition = "VARCHAR(7)")
    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth invoiceCreateMonth;

    @Column(columnDefinition = "DATE")
    private LocalDate invoiceCreateDate;

    @Column(columnDefinition = "DATE")
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @Column(columnDefinition = "DATE")
    private LocalDate dueDateofmoveinDate;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;


    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    @JsonBackReference(value = "Payment-Invoice") // Đặt tên cho tham chiếu ngược
    private Payment payment;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceDetail> detailInvoices;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceAdditionItem> additionItems = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;
}
