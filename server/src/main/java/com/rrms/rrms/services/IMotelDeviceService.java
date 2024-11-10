package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.models.Motel;

import java.util.List;
import java.util.UUID;

public interface IMotelDeviceService {
    List<MotelDeviceResponse> getAllMotelDevicesByMotel(UUID motelId);

    MotelDeviceResponse insertMotelDevice(MotelDeviceRequest motelDeviceRequest);

    void deleteMotelDevice(UUID motelDeviceId);
}
