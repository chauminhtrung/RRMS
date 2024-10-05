package com.rrms.rrms.services;

import java.util.UUID;

import com.rrms.rrms.dto.response.RoomDetailResponse;

public interface IRoomService {

    RoomDetailResponse getRoomById(UUID id);
}
