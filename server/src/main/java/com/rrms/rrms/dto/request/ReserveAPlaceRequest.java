package com.rrms.rrms.dto.request;

import java.util.Date;
import java.util.UUID;

import com.rrms.rrms.enums.ContractStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReserveAPlaceRequest {
    private Date createDate;
    private Date moveInDate;
    private String nameTenant;
    private String phoneTenant;
    private Double deposit;
    private String note;
    private ContractStatus status; // Status of the contract (ACTIVE, ENDED, etc.)
    private UUID roomId; // Liên kết tới Room
}
