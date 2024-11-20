package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.ContractServiceRequest;
import com.rrms.rrms.dto.response.ContractServiceResponse;

public interface IContractServiceService {
    ContractServiceResponse createContractService(ContractServiceRequest request);

    ContractServiceResponse updateContractService(UUID contractServiceId, ContractServiceRequest request);

    void deleteContractService(UUID contractServiceId);

    ContractServiceResponse getContractServiceById(UUID contractServiceId);

    List<ContractServiceResponse> getAllContractServices();
}
