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


    @GetMapping("/{username}")
    public ResponseEntity<List<Transaction>> getTransactionsByUsername(@PathVariable String username) {
        List<Transaction> transactions = transactionService.getTransactionsByUsername(username);
        if (transactions.isEmpty()) {
            return ResponseEntity.noContent().build(); // Trả về 204 nếu không có giao dịch
        }
        return ResponseEntity.ok(transactions); // Trả về 200 với danh sách giao dịch
    }

    @PostMapping("/receipts")
    public ResponseEntity<TransactionResponse> createReceipt(@RequestBody TransactionRequest transactionDTO,
                                                             @RequestParam String username) {
        transactionDTO.setTransactionType(true); // Đặt loại giao dịch là phiếu thu
        TransactionResponse newTransaction = transactionService.createTransaction(transactionDTO, username);
        return ResponseEntity.ok(newTransaction);
    }

    @PostMapping("/expenses")
    public ResponseEntity<TransactionResponse> createExpense(@RequestBody TransactionRequest transactionDTO,
                                                             @RequestParam String username) {
        transactionDTO.setTransactionType(false); // Đặt loại giao dịch là phiếu chi
        TransactionResponse newTransaction = transactionService.createTransaction(transactionDTO, username);
        return ResponseEntity.ok(newTransaction);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable UUID id, @RequestParam String username) {
        boolean isDeleted = transactionService.deleteTransaction(id, username);
        if (isDeleted) {
            return ResponseEntity.ok("Xóa thành công");
        } else {
            return ResponseEntity.status(404).body("Giao dịch không tồn tại hoặc không thuộc tài khoản này");
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, BigDecimal>> getSummary(@RequestParam String username) {
        Map<String, BigDecimal> summary = new HashMap<>();
        summary.put("totalIncome", transactionService.getTotalIncome(username));
        summary.put("totalExpense", transactionService.getTotalExpense(username));
        summary.put("profit", transactionService.getProfit(username));
        return ResponseEntity.ok(summary);
    }
}