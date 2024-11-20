package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.ContractDeviceRequest;
import com.rrms.rrms.dto.response.ContractDeviceResponse;

public interface IContractDeviceService {
    ContractDeviceResponse createContractDevice(ContractDeviceRequest request);

    ContractDeviceResponse updateContractDevice(UUID contractDeviceId, ContractDeviceRequest request);

    void deleteContractDevice(UUID contractDeviceId);

    ContractDeviceResponse getContractDeviceById(UUID contractDeviceId);

    List<ContractDeviceResponse> getAllContractDevices();
}
