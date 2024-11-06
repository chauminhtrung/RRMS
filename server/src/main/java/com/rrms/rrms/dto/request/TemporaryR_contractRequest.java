package com.rrms.rrms.dto.request;

import java.time.LocalDate;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TemporaryR_contractRequest {
    String householdhead;
    String representativename;
    String phone;
    LocalDate birth;
    String permanentaddress;
    String job;
    String identifier;
    String placeofissue;
    LocalDate dateofissue;
    String motelId; // ID của Motel
    String tenantUsername; // Tên người dùng của Tenant (Account)
}
