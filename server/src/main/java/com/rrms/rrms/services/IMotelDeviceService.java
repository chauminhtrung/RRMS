package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;

import java.util.List;
import java.util.UUID;

public interface IMotelDeviceService {
<<<<<<< HEAD
    List<MotelDeviceResponse> getAllMotelDevices();
=======
    List<MotelDeviceResponse> getAllMotelDevicesByMotel(UUID motelId);

>>>>>>> 5335406fe75dde3185682a62d41154e3daded24a
    MotelDeviceResponse insertMotelDevice(MotelDeviceRequest motelDeviceRequest);
    void deleteMotelDevice(UUID motelDeviceId);
}
