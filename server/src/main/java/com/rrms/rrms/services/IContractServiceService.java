package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.ContractServiceRequest;
import com.rrms.rrms.dto.response.ContractServiceResponse;

import java.util.List;
import java.util.UUID;

public interface IContractServiceService {
    ContractServiceResponse createContractService(ContractServiceRequest request);

    ContractServiceResponse updateContractService(UUID contractServiceId, ContractServiceRequest request);

    void deleteContractService(UUID contractServiceId);

    ContractServiceResponse getContractServiceById(UUID contractServiceId);

    List<ContractServiceResponse> getAllContractServices();
}