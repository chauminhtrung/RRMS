package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;

public interface IMotelDeviceService {
    List<MotelDeviceResponse> getAllMotelDevicesByMotel(UUID motelId);

    MotelDeviceResponse insertMotelDevice(MotelDeviceRequest motelDeviceRequest);

    boolean deleteMotelDevice(UUID motelDeviceId);
}
