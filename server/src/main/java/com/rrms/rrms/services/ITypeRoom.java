package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;

import java.util.List;

public interface ITypeRoom {
    TypeRoomResponse createTypeRoom(TypeRoomRequest typeRoomRequest);
    List<TypeRoomResponse> findAllTypeRooms();
}
