package com.rrms.rrms.dto.response;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.rrms.rrms.enums.Gender;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountResponse implements Serializable {
    String username;
    String fullname;
    String phone;
    String email;
    Date birthday;
    Gender gender;
    String cccd;
    String avatar;
    List<String> role;
    List<String> permissions;
}
