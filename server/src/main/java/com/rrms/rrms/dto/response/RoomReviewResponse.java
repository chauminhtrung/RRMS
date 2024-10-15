package com.rrms.rrms.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomReviewResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    UUID roomReviewId;
    Integer rating;
    String comment;
    AccountResponse account;
}
