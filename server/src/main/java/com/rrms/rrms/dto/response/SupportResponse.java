package com.rrms.rrms.dto.response;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupportResponse {
    private UUID supportId;
    private AccountResponse account;
    private String nameContact;
    private String phoneContact;
    private Date dateOfStay;
    private LocalDateTime createDate;
    private long priceFirst;
    private long priceEnd;
}
