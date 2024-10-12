package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.TypeRoom;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostRoomTableResponse {
    Motel motel;
    TypeRoom typeRoom;
    String nameRoom;
    Double price;
    Integer roomArea;
    Boolean available;
}
