package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;


import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomResponse2 {
    private UUID roomId;
    private UUID motelId;
    private String name;
    private String group;
    private Double price;
    private String prioritize;
    private Integer area;
    private Double deposit;
    private Double debt;
    private Integer countTenant;
    private Integer invoiceDate;
    private Integer paymentCircle;
    private Date moveInDate;
    private Date contractDuration;
    private Boolean status;
    private String finance;
}
