package com.rrms.rrms.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.rrms.rrms.dto.request.TransactionRequest;
import com.rrms.rrms.dto.response.TransactionResponse;
import com.rrms.rrms.models.Transaction;
import com.rrms.rrms.services.servicesImp.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/receipts")
    public ResponseEntity<TransactionResponse> createReceipt(@RequestBody TransactionRequest transactionDTO) {
        transactionDTO.setTransactionType(true); // Đặt loại giao dịch là phiếu thu
        TransactionResponse newTransaction = transactionService.createTransaction(transactionDTO);
        return ResponseEntity.ok(newTransaction);
    }

    @PostMapping("/expenses")
    public ResponseEntity<TransactionResponse> createExpense(@RequestBody TransactionRequest transactionDTO) {
        transactionDTO.setTransactionType(false); // Đặt loại giao dịch là phiếu chi
        TransactionResponse newTransaction = transactionService.createTransaction(transactionDTO);
        return ResponseEntity.ok(newTransaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable UUID id) {
        boolean isDeleted = transactionService.deleteTransaction(id);
        if (isDeleted) {
            return ResponseEntity.ok("Xóa thành công");
        } else {
            return ResponseEntity.status(404).body("Giao dịch không tồn tại");
        }
    }

    @GetMapping("/summary")
    public Map<String, BigDecimal> getSummary() {
        Map<String, BigDecimal> summary = new HashMap<>();
        summary.put("totalIncome", transactionService.getTotalIncome());
        summary.put("totalExpense", transactionService.getTotalExpense());
        summary.put("profit", transactionService.getProfit());
        return summary;
    }
}
