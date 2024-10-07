package com.rrms.rrms.dto.response;

import java.util.UUID;
import javax.swing.*;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MotelResponse {
    UUID motelId;
    String address;
    String description;
    String motelName;
    AccountResponse account;
}
