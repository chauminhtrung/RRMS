package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionResponse {
    private UUID transactionId;
    private BigDecimal amount;
    private String payerName;
    private String paymentDescription;
    private String category;
    private LocalDate transactionDate;
    private boolean transactionType;

}
