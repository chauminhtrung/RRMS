package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BulletinBoardTableResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    String title;
    String rentalCategory;
    String address;
    Double rentPrice;
    Integer area;
    Boolean status;
}
