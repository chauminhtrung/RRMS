package com.rrms.rrms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NameMotelServiceRequest {
    private String typeService; // Loại dịch vụ (vd: điện, nước,...)
    private String nameService; // Tên dịch vụ (vd: dịch vụ điện)

}
