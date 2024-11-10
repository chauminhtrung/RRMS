package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelServiceRequest;
import com.rrms.rrms.dto.request.MotelServiceUpdateRequest;
import com.rrms.rrms.dto.response.MotelServiceResponse;

public interface IMotelServiceService {
    MotelServiceResponse createMotelService(MotelServiceRequest request);

    MotelServiceResponse updateMotelService(UUID id, MotelServiceUpdateRequest request);

    void deleteMotelService(UUID id);

    MotelServiceResponse getMotelServiceById(UUID id);

    List<MotelServiceResponse> getAllMotelServices();

    MotelServiceResponse updateMotelServiceById(UUID motelServiceId, MotelServiceUpdateRequest request);
}
