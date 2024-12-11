package com.rrms.rrms.models;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID paymentId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String paymentName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "Payment-Invoice") // Đặt tên cho tham chiếu quản lý
    private List<Invoice> invoices;
}
