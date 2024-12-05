package com.rrms.rrms.services.servicesImp;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.TransactionRequest;
import com.rrms.rrms.dto.response.TransactionResponse;
import com.rrms.rrms.models.Payment;
import com.rrms.rrms.models.Transaction;
import com.rrms.rrms.repositories.PaymentRepository;
import com.rrms.rrms.repositories.TransactionRepository;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PaymentRepository paymentRepository; // Thêm repository cho Payment

    public TransactionResponse createTransaction(TransactionRequest transactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setPayerName(transactionDTO.getPayerName());
        transaction.setPaymentDescription(transactionDTO.getPaymentDescription());
        transaction.setCategory(transactionDTO.getCategory());
        transaction.setTransactionDate(transactionDTO.getTransactionDate());
        transaction.setTransactionType(transactionDTO.isTransactionType());

        // Lấy Payment từ paymentId
        Payment payment = paymentRepository
                .findById(transactionDTO.getPaymentId())
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        transaction.setPayment(payment);

        // Lưu giao dịch vào cơ sở dữ liệu
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Chuyển đổi sang DTO phản hồi
        TransactionResponse responseDTO = new TransactionResponse();
        responseDTO.setTransactionId(savedTransaction.getTransactionId());
        responseDTO.setAmount(savedTransaction.getAmount());
        responseDTO.setPayerName(savedTransaction.getPayerName());
        responseDTO.setPaymentDescription(savedTransaction.getPaymentDescription());
        responseDTO.setCategory(savedTransaction.getCategory());
        responseDTO.setTransactionDate(savedTransaction.getTransactionDate());
        responseDTO.setTransactionType(savedTransaction.isTransactionType());

        return responseDTO;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public boolean deleteTransaction(UUID id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public BigDecimal getTotalIncome() {
        List<Transaction> incomes = transactionRepository.findByTransactionType(true);
        return incomes.stream().map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getTotalExpense() {
        List<Transaction> expenses = transactionRepository.findByTransactionType(false);
        return expenses.stream().map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getProfit() {
        return getTotalIncome().subtract(getTotalExpense());
    }
}
