package com.rrms.rrms.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospecTokenResponse {
    boolean valid;
    String message;
    String subject; // số điện thoại của user
    Date expirationTime; // thời gian hết hạn
    String issuer; // người phát hành token
    Date issuedAt; // thời gian phát hành
    private List<String> roles; // Thêm roles
    private List<String> permissions; // Thêm permissions

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class TransactionRequest {
        private BigDecimal amount;
        private Long paymentId;
        private String payerName;
        private String paymentDescription;
        private String category;
        private LocalDate transactionDate;
        private boolean transactionType;
    }
}
