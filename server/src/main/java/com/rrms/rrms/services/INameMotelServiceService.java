package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.NameMotelServiceRequest;
import com.rrms.rrms.dto.response.NameMotelServiceResponse;

public interface INameMotelServiceService {
    NameMotelServiceResponse createNameMotelService(NameMotelServiceRequest request);

    NameMotelServiceResponse updateNameMotelService(UUID id, NameMotelServiceRequest request);

    List<NameMotelServiceResponse> getAllNameMotelServices();

    NameMotelServiceResponse getNameMotelServiceById(UUID id);

    void deleteNameMotelService(UUID id);
}
