package com.rrms.rrms.dto.response;

import java.time.LocalDate;

import org.springframework.data.elasticsearch.annotations.Document;

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
@Document(indexName = "tenant")
public class TenantResponse {
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
    Boolean temporaryResidence;
    Boolean informationVerify;
}
