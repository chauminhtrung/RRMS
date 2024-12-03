package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByTransactionType(boolean transactionType); // TRUE cho thu, FALSE cho chi
}
