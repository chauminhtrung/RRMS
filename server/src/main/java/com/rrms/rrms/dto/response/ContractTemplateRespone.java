package com.rrms.rrms.dto.response;

import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractTemplateRespone {
    private UUID contractTemplateId;
    private UUID motelId;
    private String namecontract;
    private String templatename;
    private int sortOrder;
    private String content;
}
