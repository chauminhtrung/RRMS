package com.rrms.rrms.services;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;

import java.util.List;

public interface ISearchService {

    List<BulletinBoardSearchResponse> listRoomByAddress(String address);
    //        List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice);

    List<BulletinBoardSearchResponse> getRooms();

    List<RoomSearchResponse> findByAddressNoElastic(String keyword);

    List<RoomSearchResponse> findByAddress(String keyword);

    List<RoomSearchResponse> findByAddressFuzzy(String keyword);

    //    List<BulletinBoardSearchResponse> findByMoveInDateLessThanEqual(Date moveInDate);

    List<BulletinBoardSearchResponse> findAllByDatenew();
}
