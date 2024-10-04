package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.Service;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomServiceResponse {

    UUID roomServiceId;
    Service service;

}
