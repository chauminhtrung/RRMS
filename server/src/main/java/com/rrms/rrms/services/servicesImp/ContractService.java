package com.rrms.rrms.services.servicesImp;

import java.math.BigDecimal;
import java.util.UUID;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.mapper.ContractMapper;
import com.rrms.rrms.models.Contract;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.services.IContractService;

@Service
public class ContractService implements IContractService {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ContractRepository contractRepository;

    @Override
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord) {
        return contractRepository.countActiveContractsByLandlord(usernameLandlord);
    }

    @Override
    public BigDecimal getTotalActiveContractsDepositByLandlord(Account usernameLandlord) {
        return contractRepository.sumActiveContractDepositsByLandlord(usernameLandlord);
    }

    public int getTotalExpiredContracts(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalExpiredContracts");
        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        query.setParameter(1, username);
        return (int) query.getSingleResult();
    }

    public int getTotalExpiringContracts(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalExpiringContractsProcedure");
        query.registerStoredProcedureParameter(1, String.class, jakarta.persistence.ParameterMode.IN);
        query.setParameter(1, username);
        return (int) query.getSingleResult();
    }



    @Override
    public ContractResponse createContract(ContractRequest request) {
        Contract contract = ContractMapper.INSTANCE.toEntity(request);
        contract = contractRepository.save(contract);
        return ContractMapper.INSTANCE.toResponse(contract);
    }

    @Override
    public ContractResponse getContractById(UUID contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id " + contractId));
        return ContractMapper.INSTANCE.toResponse(contract);
    }

    @Override
    public ContractResponse updateContract(UUID contractId, ContractRequest request) {
        Contract existingContract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id " + contractId));

        // Cập nhật các trường của hợp đồng dựa trên request
        Contract updatedContract = ContractMapper.INSTANCE.toEntity(request);
        updatedContract.setContractId(existingContract.getContractId());

        updatedContract = contractRepository.save(updatedContract);
        return ContractMapper.INSTANCE.toResponse(updatedContract);
    }

    @Override
    public void deleteContract(UUID contractId) {
        if (!contractRepository.existsById(contractId)) {
            throw new ResourceNotFoundException("Contract not found with id " + contractId);
        }
        contractRepository.deleteById(contractId);
    }






}
