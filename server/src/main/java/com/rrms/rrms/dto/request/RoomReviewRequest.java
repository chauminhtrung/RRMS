package com.rrms.rrms.dto.request;

import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomReviewRequest {
    String username;
    String fullname;
    String avatar;
    String comment;
    int rating;
    UUID roomId;
}
