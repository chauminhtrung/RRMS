package com.rrms.rrms.dto.response;

import java.io.Serializable;
import java.util.UUID;

import org.springframework.data.annotation.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomSearchResponse implements Serializable {
    @Id
    UUID roomId;

    String nameRoom;
    MotelResponse motel;
    String chargetype;
}
