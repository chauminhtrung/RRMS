package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.RoomRepositoryElasticsearch;
import com.rrms.rrms.services.ISearchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchService implements ISearchService {
    RoomRepository roomRepository;
    RoomRepositoryElasticsearch roomRepositoryElasticsearch;

    RoomMapper roomMapper;

    @Override
    public List<RoomDetailResponse> listRoomByName(String name) {
        List<Room> rooms = roomRepository.findAllByNameRoom(name);
        if (rooms.isEmpty()) {
            throw new AppException(ErrorCode.SEARCH_NOT_FOUND);
        }

        //        rooms.forEach(room -> System.out.printf("room0"+room));

        // Chuyển đổi từ Room sang RoomDetailResponse
        return rooms.stream().map(roomMapper::toRoomDetailResponse).collect(Collectors.toList());
    }

    //    @Override
    //    public List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice) {
    //        // Tìm kiếm các phòng trong khoảng giá
    //        List<Room> rooms = roomRepository.findAllByPriceBetween(startPrice, endPrice);
    //
    //        // Kiểm tra xem có phòng nào được tìm thấy không
    //        if (rooms.isEmpty()) {
    //            throw new AppException(ErrorCode.SEARCH_NOT_FOUND);
    //        }
    //
    //        // Chuyển đổi từ Room sang RoomDetailResponse
    //        return rooms.stream()
    //                .map(this::convertToRoomDetailResponse)
    //                .collect(Collectors.toList());
    //    }

    // Phương thức chuyển đổi từ Room sang RoomDetailResponse
    //    private RoomDetailResponse convertToRoomDetailResponse(Room room) {
    //        // Chuyển đổi thông tin từ Room sang RoomDetailResponse
    //        RoomDetailResponse response = new RoomDetailResponse();
    //        // Ví dụ: response.setId(room.getId());
    //        // Thêm các thuộc tính khác tùy theo yêu cầu
    //        return response;
    //    }

    @Override
    public String syncRoom(List<Room> rooms) {
        String message = "Error synchronize data";
        List<RoomSearchResponse> roomSearchResponsesList = rooms.stream()
                .map(roomMapper::toRoomSearchResponse)
                .collect(Collectors.toList());
        try {
            roomRepositoryElasticsearch.saveAll(roomSearchResponsesList);
            message = "Synchronized data Mysql and Elasticsearch";
            log.info(message);
        } catch (Exception e) {
            log.error(message);
        }
        return message;
    }

    @Override
    public List<RoomSearchResponse> findByAddressNoElastic(String keyword) {
        log.info("Normal search no elasticsearch room by address: {}", keyword);
        List<Room> rooms = roomRepository.findByAddress(keyword);
        return rooms.stream().map(roomMapper::toRoomSearchResponse).collect(Collectors.toList());
    }

    @Override
    public List<RoomSearchResponse> findByAddress(String keyword) {
        log.info("Normal search room by address: {}", keyword);
        return roomRepositoryElasticsearch.findByAddress(keyword);
    }

    @Override
    public List<RoomSearchResponse> findByAddressFuzzy(String keyword) {
        log.info("Fuzzy search address: {}", keyword);
        return roomRepositoryElasticsearch.findByAddressFuzzy(keyword);
    }
}
