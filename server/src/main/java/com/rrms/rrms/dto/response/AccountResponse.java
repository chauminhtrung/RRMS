package com.rrms.rrms.dto.response;

import com.rrms.rrms.enums.Gender;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse implements Serializable {
    String username;
    String fullname;
    String phone;
    String email;
    LocalDate birthday;
    Gender gender;
    String cccd;
    String avatar;
}