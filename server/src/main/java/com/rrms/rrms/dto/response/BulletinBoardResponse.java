package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.rrms.rrms.models.BulletinBoardImage;
import com.rrms.rrms.models.BulletinBoardRule;
import com.rrms.rrms.models.BulletinBoards_RentalAm;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulletinBoardResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    UUID bulletinBoardId;
    AccountResponse account;
    String title;
    String rentalCategory;
    String description;
    Double rentPrice;
    Double promotionalRentalPrice;
    Double deposit;
    Integer area;
    Double electricityPrice;
    Double waterPrice;
    Integer maxPerson;
    Date moveInDate;
    String openingHours;
    String closeHours;
    String address;
    Double longitude;
    Double latitude;
    Boolean status;
    Boolean isActive;
    List<BulletinBoardImage> bulletinBoardImages;
    List<BulletinBoardReviewsResponse> bulletinBoardReviews;
    List<BulletinBoardRule> bulletinBoardRules;
    List<BulletinBoards_RentalAm> bulletinBoards_RentalAm;
}
