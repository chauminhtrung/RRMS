package com.rrms.rrms.dto.request;

import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CarRequest {
    private String name;
    private String number;
    private String image;
    private UUID roomId; // ID của Room để liên kết
}
