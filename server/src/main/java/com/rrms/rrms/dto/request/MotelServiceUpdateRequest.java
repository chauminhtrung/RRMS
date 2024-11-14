package com.rrms.rrms.dto.request;

import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MotelServiceUpdateRequest {
    String nameService;
    Long price;
    String chargetype;
    List<UUID> selectedRooms;
}
