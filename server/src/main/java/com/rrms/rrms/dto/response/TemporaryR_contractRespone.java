package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.TemporaryR_contract;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TemporaryR_contractRespone  {
    UUID temporaryrcontractId;
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


    // Constructor để ánh xạ dữ liệu từ TemporaryR_contract
    public TemporaryR_contractRespone(TemporaryR_contract contract) {
        this.temporaryrcontractId = contract.getTemporaryrcontractId();
        this.householdhead = contract.getHouseholdhead();
        this.representativename = contract.getRepresentativename();
        this.phone = contract.getPhone();
        this.birth = contract.getBirth();
        this.permanentaddress = contract.getPermanentaddress();
        this.job = contract.getJob();
        this.identifier = contract.getIdentifier();
        this.placeofissue = contract.getPlaceofissue();
        this.dateofissue = contract.getDateofissue();
        this.motelId = contract.getMotel() != null ? contract.getMotel().getMotelId().toString() : null;
        this.tenantUsername = contract.getTenant() != null ? contract.getTenant().getUsername() : null;
    }


}
