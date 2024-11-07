package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulletinBoardReviewsResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    String bulletinBoardReviewsId;
    String content;
    Integer rating;
    AccountResponse account;
}
