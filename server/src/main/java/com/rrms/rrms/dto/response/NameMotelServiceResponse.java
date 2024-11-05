package com.rrms.rrms.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NameMotelServiceResponse {
    private UUID nameMotelServicesId; // ID của NameMotelService
    private String typeService;       // Loại dịch vụ
    private String nameService;       // Tên dịch vụ

}
