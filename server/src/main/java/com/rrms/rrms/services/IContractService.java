package com.rrms.rrms.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.models.Account;

public interface IContractService {
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord);

    public BigDecimal getTotalActiveContractsDepositByLandlord(Account usernameLandlord);

    //    public long getExpiredContracts(Account usernameLandlord );
    //
    //    public long getExpiringContracts(Account usernameLandlord);
    ContractResponse createContract(ContractRequest request);

    ContractResponse getContractById(UUID contractId);

    ContractResponse updateContract(UUID contractId, ContractRequest request);

    void deleteContract(UUID contractId);

    List<ContractResponse> getAllContractsByMotelId(UUID motelId);

    ContractResponse getAllContractsByRoomId(UUID motelId);
}
