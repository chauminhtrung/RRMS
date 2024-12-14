package com.rrms.rrms.dto.request;

import com.rrms.rrms.models.Account;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SupportRequest {
    private AccountRequest account;
    private String nameContact;
    private Date dateOfStay;
    private long priceFirst;
    private long priceEnd;
}
