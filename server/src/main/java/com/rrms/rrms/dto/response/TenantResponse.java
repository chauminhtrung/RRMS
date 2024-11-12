package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

import com.rrms.rrms.enums.Gender;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TenantResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    UUID tenantId;
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
