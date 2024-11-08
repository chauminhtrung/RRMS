package com.rrms.rrms.dto.request;

import com.rrms.rrms.models.BulletinBoardImage;
import com.rrms.rrms.models.BulletinBoardRule;
import com.rrms.rrms.models.BulletinBoards_RentalAm;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulletinBoardRequest {

    String username;
    String title;
    String rentalCategory;
    String description;
    Double rentPrice;
    Double promotionalRentalPrice;
    Double deposit;
    Integer area;
    Double electricityPrice;
    Double waterPrice;
    String maxPerson;
    Date moveInDate;
    String openingHours;
    String closeHours;
    String address;
    Double longitude;
    Double latitude;
    Boolean status;
    Boolean isActive;
    List<BulletinBoardImage> bulletinBoardImages;
    List<BulletinBoardRule> bulletinBoardRules;
    List<BulletinBoards_RentalAm> bulletinBoards_RentalAm;
}
