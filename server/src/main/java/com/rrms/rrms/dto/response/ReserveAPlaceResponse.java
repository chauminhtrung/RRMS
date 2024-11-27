package com.rrms.rrms.dto.response;


import com.rrms.rrms.enums.ContractStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReserveAPlaceResponse {
    private UUID reserveAPlaceId;
    private Date createDate;
    private Date moveInDate;
    private String nameTenant;
    private String phoneTenant;
    private Double deposit;
    private String note;
    private ContractStatus status; // Status of the contract (ACTIVE, ENDED, etc.)
    private RoomResponse2 room; // Trả về đối tượng Room
}