package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

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
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "room_service_id")
    private RoomService roomService;

    @ManyToOne
    @JoinColumn(name = "room_device_id")
    private RoomDevice roomDevice;

    @Column(columnDefinition = "INT")
    private Integer roomServiceQuantity;
}
