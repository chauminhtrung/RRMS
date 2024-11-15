package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.BulletinBoardMapper;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.*;
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
    RoomRepositoryElasticsearch roomRepositoryElasticsearch;
    BulletinBoardMapper bulletinBoardMapper;
    RoomMapper roomMapper;
    private final BulletinBoardRepository bulletinBoardRepository;

    SearchRepository searchRepository;

    @Override
    public List<BulletinBoardSearchResponse> listRoomByAddress(String address) {
        List<BulletinBoard> bulletinBoards = bulletinBoardRepository.findByAddress(address);

        if (bulletinBoards.isEmpty()) {
            throw new AppException(ErrorCode.SEARCH_NOT_FOUND);
        }
        return bulletinBoards.stream()
                .map(bulletinBoardMapper::toBulletinBoardSearchResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BulletinBoardSearchResponse> getRooms() {
        List<BulletinBoard> bulletinBoards = bulletinBoardRepository.findAllByIsActive(true);
        return bulletinBoards.stream()
                .map(bulletinBoardMapper::toBulletinBoardSearchResponse)
                .toList();
    }

    //        @Override
    //        public List<RoomDetailResponse> listRoomPrice(Double startPrice, Double endPrice) {
    //            // Tìm kiếm các phòng trong khoảng giá
    //            Optional<List<Room>> rooms = roomRepository.findAllByPriceBetween(startPrice, endPrice);
    //
    //            // Kiểm tra xem có phòng nào được tìm thấy không
    //            if (rooms.isEmpty()) {
    //                throw new AppException(ErrorCode.SEARCH_NOT_FOUND);
    //            }
    //
    //            // Chuyển đổi từ Room sang RoomDetailResponse
    //            return rooms.stream()
    //                    .map(this::convertToRoomDetailResponse)
    //                    .collect(Collectors.toList());
    //        }

    // Phương thức chuyển đổi từ Room sang RoomDetailResponse
    //        private RoomDetailResponse convertToRoomDetailResponse(Room room) {
    //            // Chuyển đổi thông tin từ Room sang RoomDetailResponse
    //            RoomDetailResponse response = new RoomDetailResponse();
    //            // Ví dụ: response.setId(room.getId());
    //            // Thêm các thuộc tính khác tùy theo yêu cầu
    //            return response;
    //        }

    @Override
    public String syncRoom(List<Room> rooms) {
        String message = "Error synchronize data";
        List<RoomSearchResponse> roomSearchResponsesList =
                rooms.stream().map(roomMapper::toRoomSearchResponse).collect(Collectors.toList());
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

    //    @Override
    //    public List<BulletinBoardSearchResponse> findByMoveInDateLessThanEqual(Date moveInDate) {
    //        // Ensure the repository method accepts a Date parameter
    //        return searchRepository.findByMoveInDateLessThanEqual(moveInDate).stream()
    //                .map(bulletinBoardMapper::toBulletinBoardSearchResponse)
    //                .collect(Collectors.toList());
    //    }

    @Override
    public List<BulletinBoardSearchResponse> findAllByDatenew() {
        return searchRepository.findAllByDatenew().stream()
                .map(bulletinBoardMapper::toBulletinBoardSearchResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BulletinBoardSearchResponse> findAllByDateVieux() {
        return searchRepository.findAllByDateVieux().stream()
                .map(bulletinBoardMapper::toBulletinBoardSearchResponse)
                .collect(Collectors.toList());
    }


}
