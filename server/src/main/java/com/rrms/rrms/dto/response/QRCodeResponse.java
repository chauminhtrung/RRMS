package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QRCodeResponse {
    private String qrCodeImage; // Ảnh QR dưới dạng Base64
    private String qrContent; // Nội dung QR (nếu cần hiển thị)
}
