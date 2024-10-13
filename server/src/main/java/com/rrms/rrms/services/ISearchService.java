package com.rrms.rrms.services;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.models.Room;

import java.util.List;

public interface ISearchService {

    List<RoomDetailResponse> listRoomByName(String name);
    //    List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice);

    String syncRoom(List<Room> rooms);

    List<RoomSearchResponse> findByAddress(String keyword);

    List<RoomSearchResponse> findByAddressFuzzy(String keyword);

}
