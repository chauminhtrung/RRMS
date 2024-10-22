package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Room;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HeartResponse {
    UUID heartId;
    AccountResponse account;
    List<RoomDetailResponse> rooms;
}
