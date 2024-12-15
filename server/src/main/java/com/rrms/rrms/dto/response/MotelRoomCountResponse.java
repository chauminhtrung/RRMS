package com.rrms.rrms.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotelRoomCountResponse {
    private UUID motelId;
    private String motelName;
    private int activeCount;
    private int endedCount;
    private int iatExpireCount;
    private int stakeCount;
    private int reportEndCount;
    private int noContractCount; // Số phòng không có hợp đồng
    private int reservedCount; // Số phòng đã đặt cọc
}
