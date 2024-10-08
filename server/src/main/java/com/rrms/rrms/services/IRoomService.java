package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.models.Room;
import org.springframework.http.HttpStatusCode;

public interface IRoomService {

    RoomDetailResponse getRoomById(UUID id);

    List<Room> getRooms();
}
