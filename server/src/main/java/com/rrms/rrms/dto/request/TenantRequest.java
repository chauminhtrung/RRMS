package com.rrms.rrms.dto.request;

import java.time.LocalDate;

import com.rrms.rrms.enums.Gender;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TenantRequest {
    String avata;
    String fullname;
    String phone;
    String cccd;
    String email;
    LocalDate birthday;
    Gender gender;
    String address;
    String job;
    LocalDate licenseDate;
    String placeOfLicense;
    String frontPhoto;
    String backPhoto;
    Boolean role;
    String relationship;
    Boolean type_of_tenant;
    Boolean temporaryResidence;
    Boolean informationVerify;
}
