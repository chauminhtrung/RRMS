package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.models.Room;

public interface ISearchService {

    List<RoomDetailResponse> listRoomByName(String name);
//    List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice);
}
