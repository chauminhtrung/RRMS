package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rrms.rrms.models.DetailInvoice;

@Repository
public interface DetailInvoiceRepository extends JpaRepository<DetailInvoice, UUID> {
    List<DetailInvoice> findByInvoiceInvoiceId(UUID invoiceId);
}
