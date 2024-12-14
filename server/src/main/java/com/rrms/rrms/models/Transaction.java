package com.rrms.rrms.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    // Thêm trường username
    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    @JsonIgnore // Tránh serialize account
    private Account account; // Tài khoản liên quan đến giao dịch
}
