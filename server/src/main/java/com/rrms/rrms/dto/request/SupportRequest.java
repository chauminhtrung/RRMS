package com.rrms.rrms.dto.request;

import java.sql.Date;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SupportRequest {
    private AccountRequest account;
    private Date dateOfStay;
    private long priceFirst;
    private long priceEnd;
}
