//package com.rrms.rrms.controllers;
//
//import com.rrms.rrms.dto.response.ApiResponse;
//import com.rrms.rrms.dto.response.RoomDetailResponse;
//import com.rrms.rrms.models.Heart;
//import com.rrms.rrms.services.IHeart;
//import com.rrms.rrms.services.IRoomService;
//import com.rrms.rrms.services.servicesImp.HeartService;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@Slf4j
//@RequestMapping("/heart")
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//@RequiredArgsConstructor
//public class HeartController {
//    private final IRoomService roomService;
////    IHeart heartService;
////
////    @GetMapping
////    public ApiResponse<List<RoomDetailResponse>> getRoom() {
////        ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
////        List<RoomDetailResponse> rooms = roomService.getRooms();
////        apiResponse.setCode(HttpStatus.OK.value());
////        apiResponse.setMessage("Tìm kiếm thành công");
////        apiResponse.setResult(rooms);
////        return apiResponse;
////    }
////    @PostMapping("/addHeart")
////    public ResponseEntity<Heart> addHeart(@RequestBody Heart heart) {
////        Heart savedHeart = heartService.addHeart(heart);
////        return ResponseEntity.ok(savedHeart);
////    }
////
////    @DeleteMapping("/remove/{heartId}")
////    public ResponseEntity<Void> removeHeart(@PathVariable UUID heartId) {
////        heartService.removeHeart(heartId);
////        return ResponseEntity.noContent().build();
////    }
//    @PostMapping("/api/hearts")
//    public ResponseEntity<Heart> addOrUpdateHeart(@RequestBody Heart heart) {
//    Heart savedHeart = heartService.save(heart);
//    return ResponseEntity.ok(savedHeart);
//}
//
//
//}
