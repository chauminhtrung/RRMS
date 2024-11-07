package com.rrms.rrms.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotelServiceRequest {
    private UUID motelId; // ID của Motel (liên kết với bảng Motel)
    private String nameService;
    private Long price; // Giá của dịch vụ
    private String chargetype; // Kiểu tính phí (vd: theo tháng, theo người)
}
