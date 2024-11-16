package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardImage;
import com.rrms.rrms.models.BulletinBoardRule;
import com.rrms.rrms.models.BulletinBoards_RentalAm;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(indexName = "bulletin-boards")
public class BulletinBoardSearchResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    UUID bulletinBoardId;
    AccountResponse account;
    String title;
    String description;
    Double rentPrice;
    Double promotionalRentalPrice;
    Integer area;
    Double electricityPrice;
    Double waterPrice;
    Date moveInDate;
    Date createdDate;
    String address;
    Boolean isActive;
    List<BulletinBoardImage> bulletinBoardImages;
    List<BulletinBoardReviewsResponse> bulletinBoardReviews;
    List<BulletinBoardRule> bulletinBoardRules;
    List<BulletinBoards_RentalAm> bulletinBoards_RentalAm;

    public BulletinBoardSearchResponse(BulletinBoard bulletinBoard) {
        this.bulletinBoardId = bulletinBoard.getBulletinBoardId();
        this.isActive = bulletinBoard.getIsActive();
    }
}
