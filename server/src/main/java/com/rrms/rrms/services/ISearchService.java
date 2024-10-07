package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.models.Room;

public interface ISearchService {

    List<Room> listRoomByName(String name);

    List<Room> listRoomPrice(Double startPrice, Double endPrice);
}
