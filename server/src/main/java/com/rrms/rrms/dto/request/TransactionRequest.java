package com.rrms.rrms.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionRequest {
    private BigDecimal amount;
    private UUID paymentId;
    private String payerName;
    private String paymentDescription;
    private String category;
    private LocalDate transactionDate;
    private boolean transactionType;
}
