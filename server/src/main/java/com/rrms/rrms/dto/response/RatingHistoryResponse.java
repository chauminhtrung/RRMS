package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardImage;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RatingHistoryResponse implements Serializable {
    BulletinBoard bulletinBoard;
    int rating;
    String content;
    List<BulletinBoardImage> bulletinBoardImages;
}
