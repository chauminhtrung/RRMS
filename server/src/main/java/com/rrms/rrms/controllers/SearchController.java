package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.services.IRoom;
import com.rrms.rrms.services.ISearchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/searchs")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {


    ISearchService searchService;

    private final IRoom roomService;

    @GetMapping
    public ApiResponse<List<RoomDetailResponse>> getRoom() {
        ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
        List<RoomDetailResponse> rooms = roomService.getRooms();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(rooms);
        return apiResponse;
    }

    @GetMapping("/name")
    public ApiResponse<List<RoomDetailResponse>> searchName(@RequestParam("name") String name) {
        ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
        List<RoomDetailResponse> rooms = searchService.listRoomByName(name);
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

    @GetMapping("/address")
    public ApiResponse<List<RoomSearchResponse>> findByAddress(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddress(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(roomSearchResponseList)
                .build();
    }

    @GetMapping("/addressFuzzy")
    public ApiResponse<List<RoomSearchResponse>> findByAddressFuzzy(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddressFuzzy(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(roomSearchResponseList)
                .build();
    }
}
