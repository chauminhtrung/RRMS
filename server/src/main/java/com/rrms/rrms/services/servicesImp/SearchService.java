package com.rrms.rrms.services.servicesImp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.ISearchService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchService implements ISearchService {
    RoomRepository roomRepository;

    @Override
    public List<Room> listRoomByName(String name) {
        return roomRepository.findAllByNameRoom(name);
    }

    @Override
    public List<Room> listRoomPrice(Double startPrice, Double endPrice) {
        //        log.info(String.valueOf(roomRepository.findAllByPriceBetween(startPrice,endPrice).get().size()));
        if (roomRepository.findAllByPriceBetween(startPrice, endPrice).get().isEmpty()) {
            throw new AppException(ErrorCode.SEARCH_NOT_FOUND);
        }
        return roomRepository.findAllByPriceBetween(startPrice, endPrice).get();
    }
}
