package com.rrms.rrms.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID transactionId;

    @Column(name = "amount", nullable = false, columnDefinition = "DECIMAL(10, 2)")
    private BigDecimal amount; // Số tiền thu

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @Column(name = "payer_name", nullable = false, length = 100)
    private String payerName; // Tên người thanh toán

    @Column(name = "payment_description", nullable = false)
    private String paymentDescription; // Nội dung thanh toán

    @Column(name = "category", nullable = false, length = 100)
    private String category; // Danh mục thu

    @Column(name = "transaction_date", nullable = false, columnDefinition = "DATE")
    private LocalDate transactionDate; // Ngày lập phiếu

    @Column(name = "transaction_type", nullable = false)
    private boolean transactionType; // TRUE cho thu, FALSE cho chi


}
