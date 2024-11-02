package com.rrms.rrms.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractTemplateRequest {
    private UUID motelId; // ID của Motel liên kết với mẫu hợp đồng này
    private String namecontract;
    private String templatename;
    private int sortOrder;
    private String content;
}
