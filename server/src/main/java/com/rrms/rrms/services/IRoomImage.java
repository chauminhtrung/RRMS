package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RoomImageRequest;
import com.rrms.rrms.dto.response.RoomImageResponse;

public interface IRoomImage {

    RoomImageResponse postRoomImage(RoomImageRequest roomImageRequest);
}
