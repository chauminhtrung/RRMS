package com.rrms.rrms.dto.request;

import java.util.Date;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomRequest2 {
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
    private String description;
}
