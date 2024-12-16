package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detail_invoices")
public class InvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID detailInvoiceId;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @JsonBackReference(value = "invoicedetail-Invoice") // Đặt tên cho tham chiếu ngược
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "room_service_id")
    private RoomService roomService;

    @ManyToOne
    @JoinColumn(name = "room_device_id")
    @JsonBackReference(value = "roomdevice-InvoiceDetail") // Đặt tên cho tham chiếu ngược
    private RoomDevice roomDevice;

    @Column(columnDefinition = "INT")
    private Integer roomServiceQuantity;
}
