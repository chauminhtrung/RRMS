package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.models.MotelDevice;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MotelDeviceMapper {
    MotelDevice motelDeviceRequestToMotelDevice(MotelDeviceRequest motelDeviceRequest);

    MotelDeviceResponse motelDeviceToMotelDeviceResponse(MotelDevice motelDevice);
}