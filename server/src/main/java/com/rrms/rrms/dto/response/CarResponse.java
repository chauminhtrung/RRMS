package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CarResponse {
    private UUID carId;
    private String name;
    private String number;
    private String image;
    private UUID roomId;
}
