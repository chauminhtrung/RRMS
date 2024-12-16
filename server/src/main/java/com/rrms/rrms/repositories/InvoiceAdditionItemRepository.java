package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.InvoiceAdditionItem;

public interface InvoiceAdditionItemRepository extends JpaRepository<InvoiceAdditionItem, UUID> {}
