package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import com.rrms.rrms.models.MotelService;
import com.rrms.rrms.models.Room;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoomServiceRespone2 implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private UUID roomServiceId;
    private Room room; // Thay vì đối tượng Room, chỉ trả về ID
    private MotelService service; // Thay vì đối tượng Service, chỉ trả về ID
    private Integer quantity;
}
