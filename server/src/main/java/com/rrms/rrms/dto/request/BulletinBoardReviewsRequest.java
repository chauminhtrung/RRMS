package com.rrms.rrms.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulletinBoardReviewsRequest {
    String username;
    UUID bulletinBoardId;
    int rating;
    String content;
}
