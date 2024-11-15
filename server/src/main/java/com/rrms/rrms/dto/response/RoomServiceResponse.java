package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoomServiceResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private UUID roomServiceId;
    private UUID roomId; // Thay vì đối tượng Room, chỉ trả về ID
    private UUID serviceId; // Thay vì đối tượng Service, chỉ trả về ID
    private Integer quantity;
}
