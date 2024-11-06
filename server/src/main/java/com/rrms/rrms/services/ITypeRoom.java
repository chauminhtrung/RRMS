package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;

public interface ITypeRoom {
    TypeRoomResponse createTypeRoom(TypeRoomRequest typeRoomRequest);

    List<TypeRoomResponse> findAllTypeRooms();
}
