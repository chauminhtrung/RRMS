package com.rrms.rrms.dto.request;

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
public class RoomRequest {
    UUID modelId;
    String typeRoomName;
    List<String> roomServices;
    List<String> roomImages;
    long priceElectric;
    long priceWater;
    String owner;
    String phone;
    List<String> rules;
    String address;
    String nameRoom;
    Double price;
    Double deposit;
    Integer roomArea;
    Integer maxPerson;
    LocalDate rentalStartTime;
    Boolean available;
    String hours;
    String description;
}
