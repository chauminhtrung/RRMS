package com.rrms.rrms.dto.request;

import java.time.LocalDate;
import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomRequest {
    List<String> roomImages;
    long priceElectric;
    long priceWater;
    List<String> rules;
    String address;
    String username;
    List<String> roomServices;
    Boolean censor;
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
