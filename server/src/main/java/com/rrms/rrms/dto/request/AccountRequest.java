package com.rrms.rrms.dto.request;

import com.rrms.rrms.enums.Gender;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountRequest implements Serializable {
    String username;
    String fullname;
    String phone;
    String email;
    LocalDate birthday;
    Gender gender;
    String cccd;
    String avatar;


}