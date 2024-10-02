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
public class DetailInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID detailInvoiceId;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "roomServiceId")
    private RoomService roomService;

    @ManyToOne
    @JoinColumn(name = "roomDeviceId")
    private RoomDevice roomDevice;
}
