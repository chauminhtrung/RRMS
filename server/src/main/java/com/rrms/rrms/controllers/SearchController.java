package com.rrms.rrms.controllers;

import java.util.ArrayList;
import java.util.List;

import com.rrms.rrms.dto.response.*;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.services.IRoom;
import com.rrms.rrms.services.ISearchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Search Controller")
@RestController
@Slf4j
@RequestMapping("/searchs")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {

    ISearchService searchService;

    IRoom roomService;


//        @Operation(summary = "Get all rooms authen")
//        @GetMapping("/roomNews")
//        @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')") // su dung phân quền phù hop theo role
//        public ApiResponse<List<RoomDetailResponse>> getRoomHomeDateNew() {
//            ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
//            List<RoomDetailResponse> rooms = searchService.findAllByDatenew();
//            apiResponse.setCode(HttpStatus.OK.value());
//            apiResponse.setMessage("Tìm kiếm thành công");
//            apiResponse.setResult(rooms);
//            return apiResponse;
//        }

//        @Operation(summary = "Get all rooms authen")
//        @GetMapping("/rooms")
//        @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')") // su dung phân quền phù hop theo role
//        public ApiResponse<List<RoomDetailResponse>> getRoomHome() {
//            ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
//            List<RoomDetailResponse> rooms = searchService.findByAuthenIs(true);
//            apiResponse.setCode(HttpStatus.OK.value());
//            apiResponse.setMessage("Tìm kiếm thành công");
//            apiResponse.setResult(rooms);
//            return apiResponse;
//        }

    @Operation(summary = "Get all rooms")
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')") // su dung phân quền phù hop theo role
    public ApiResponse<List<BulletinBoardSearchResponse>> getRoom() {
        ApiResponse<List<BulletinBoardSearchResponse>> apiResponse = new ApiResponse<>();
        List<BulletinBoardSearchResponse> rooms = searchService.getRooms();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(rooms);
        return apiResponse;
    }



    @Operation(summary = "Search room by name")
    @GetMapping("/addressBullet")
    public ApiResponse<List<BulletinBoardSearchResponse>> searchAddress(@RequestParam("address") String address) {
        ApiResponse<List<BulletinBoardSearchResponse>> apiResponse = new ApiResponse<>();
        List<BulletinBoardSearchResponse> rooms = searchService.listRoomByAddress(address);
        if (rooms == null || rooms.isEmpty()) {
            // Trả về danh sách trống thay vì ném ngoại lệ
            apiResponse.setCode(HttpStatus.OK.value());
            apiResponse.setMessage("Không tìm thấy kết quả");
            apiResponse.setResult(new ArrayList<>());
            return apiResponse;
        }
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(rooms);
        return apiResponse;
    }


    //    @GetMapping("/price")
    //    public ApiResponse<List<Room>> searchPrice(
    //            @RequestParam("startPrice") Double startPrice, @RequestParam("endPrice") Double endPrice) {
    //        ApiResponse<List<Room>> apiResponse = new ApiResponse<>();
    //        List<Room> list = searchService.listRoomPrice(startPrice, endPrice);
    //        apiResponse.setCode(HttpStatus.OK.value());
    //        apiResponse.setMessage("Tìm kiếm thành công");
    //        apiResponse.setResult(list);
    //
    //        return apiResponse;
    //    }

    @Operation(summary = "Search room by address")
    @GetMapping("/addressNoElastic")
    public ApiResponse<List<RoomSearchResponse>> findByAddressNoElastic(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddressNoElastic(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }

    @Operation(summary = "Search room by address use elastic search without cache")
    @GetMapping("/nocache/address")
    public ApiResponse<List<RoomSearchResponse>> findByAddressNoCache(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddress(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }

    @Operation(summary = "Search room by address use elastic search")
    @Cacheable(value = "room", key = "#address")
    @GetMapping("/address")
    public ApiResponse<List<RoomSearchResponse>> findByAddress(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddress(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }

    @Operation(summary = "Search room by address fuzzy use elastic search")
    @GetMapping("/addressFuzzy")
    public ApiResponse<List<RoomSearchResponse>> findByAddressFuzzy(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddressFuzzy(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }
}
