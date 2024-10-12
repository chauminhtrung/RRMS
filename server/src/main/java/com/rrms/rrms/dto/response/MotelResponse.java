package com.rrms.rrms.dto.response;

import java.util.UUID;
import javax.swing.*;

import jakarta.persistence.Column;
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
    String motelName;
    Double area;
    Long averagePrice;
    String address;
    AccountResponse account;
}
