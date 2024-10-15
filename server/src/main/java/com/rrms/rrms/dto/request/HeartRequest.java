package com.rrms.rrms.dto.request;

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

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HeartRequest {
    AccountRequest account;
    RoomRequest room;
}
