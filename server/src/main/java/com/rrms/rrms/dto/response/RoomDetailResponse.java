package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomDetailResponse {

    UUID roomId;
    String nameRoom;
    Double price;
    Double roomArea;
    Boolean available;
    String description;
    List<RoomImageResponse> roomImages;
    List<RoomReviewResponse> roomReviews;
    TypeRoomResponse typeRoom;
    MotelResponse motel;
}
