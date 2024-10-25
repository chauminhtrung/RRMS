package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomDetailResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    UUID roomId;
    String censor;
    String nameRoom;
    Double deposit;
    Double price;
    Integer roomArea;
    Boolean available;
    String description;
    Integer maxPerson;
    LocalDate rentalStartTime;
    String hours;
    TypeRoomResponse typeRoom;
    MotelResponse motel;
    List<RoomServiceResponse> roomServices;
    List<RoomReviewResponse> roomReviews;
    List<RoomImageResponse> roomImages;
}
