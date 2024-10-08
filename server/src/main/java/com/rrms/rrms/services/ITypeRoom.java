package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;

public interface ITypeRoom {
    TypeRoomResponse createTypeRoom(TypeRoomRequest typeRoomRequest);
}
