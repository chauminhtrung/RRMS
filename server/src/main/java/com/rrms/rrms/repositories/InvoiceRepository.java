package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rrms.rrms.models.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    @Query(value = "CALL GetTotalRoomPriceProcedure(?1)", nativeQuery = true)
    Double getTotalRoomPrice(String username);

    @Query(value = "CALL GetTotalServicePriceProcedure(?1)", nativeQuery = true)
    Double getTotalServicePrice(String username);

    @Query(value = "CALL GetTotalInvoiceProcedure(?1)", nativeQuery = true)
    Double getTotalInvoice(String username);
}
