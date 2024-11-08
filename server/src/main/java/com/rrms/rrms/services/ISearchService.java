package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.models.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ISearchService {

        List<BulletinBoardSearchResponse> listRoomByAddress(String address);
//        List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice);

    List<BulletinBoardSearchResponse> getRooms();
    String syncRoom(List<Room> rooms);

    List<RoomSearchResponse> findByAddressNoElastic(String keyword);

    List<RoomSearchResponse> findByAddress(String keyword);

    List<RoomSearchResponse> findByAddressFuzzy(String keyword);

//        List<RoomDetailResponse> findByAuthenIs(Boolean authenis);

    //    List<RoomDetailResponse> findAllByDatenew();
}
