package com.rrms.rrms.dto.response;

import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

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
