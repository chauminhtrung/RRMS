package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.models.Room;

public interface ISearchService {

    List<RoomDetailResponse> listRoomByName(String name);
    //    List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice);

    String syncRoom(List<Room> rooms);

    List<RoomSearchResponse> findByAddressNoElastic(String keyword);

    List<RoomSearchResponse> findByAddress(String keyword);

    List<RoomSearchResponse> findByAddressFuzzy(String keyword);

    List<RoomDetailResponse> findByAuthenIs(Boolean authenis);

    List<RoomDetailResponse> findAllByDatenew();
}
