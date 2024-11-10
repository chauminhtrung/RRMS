package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;

public interface IMotelDeviceService {
    List<MotelDeviceResponse> getAllMotelDevices();

    MotelDeviceResponse insertMotelDevice(MotelDeviceRequest motelDeviceRequest);

    void deleteMotelDevice(UUID motelDeviceId);
}
