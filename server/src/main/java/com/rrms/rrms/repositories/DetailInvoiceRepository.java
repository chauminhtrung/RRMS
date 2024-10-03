package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.DetailInvoice;

public interface DetailInvoiceRepository extends JpaRepository<DetailInvoice, UUID> {}
