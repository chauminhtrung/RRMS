package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.Account;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupportResponse {
    private UUID supportId;
    private AccountResponse account;
    private Date dateOfStay;
    private Date createDate;
    private long priceFirst;
    private long priceEnd;
}
