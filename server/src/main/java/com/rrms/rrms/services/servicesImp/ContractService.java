package com.rrms.rrms.services.servicesImp;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.mapper.ContractMapper;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.rrms.rrms.services.IContractService;

@Service
public class ContractService implements IContractService {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ContractTemplateRepository contractTemplateRepository;


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
        System.out.println("username o day: " + request.getUsername());
        System.out.println("room o day: " + request.getRoomId());
        System.out.println("tenant o day: " + request.getTenantId());
        System.out.println("contractempalte o day: " + request.getContracttemplateId());
        // Fetch related entities from the database using UUIDs
        Account username = accountRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Room not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new EntityNotFoundException("Room not found"));

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));

        ContractTemplate contractTemplate = contractTemplateRepository.findById(request.getContracttemplateId())
                .orElseThrow(() -> new EntityNotFoundException("ContractTemplate not found"));


        // Create Contract entity from the request and set related entities
        Contract contract = ContractMapper.INSTANCE.toEntity(request);
        contract.setAccount(username);  // Set the fetched account entity
        contract.setRoom(room);  // Set the fetched Room entity
        contract.setTenant(tenant);  // Set the fetched Tenant entity
        contract.setContract_template(contractTemplate);  // Set the fetched ContractTemplate entity


        // Save the contract
        contract = contractRepository.save(contract);

        // Return the response after saving the contract
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

    @Override
    public List<ContractResponse> getAllContractsByMotelId(UUID motelId) {
        List<Contract> contracts = contractRepository.findByRoom_Motel_MotelId(motelId);

        if (contracts.isEmpty()) {
            throw new EntityNotFoundException("No contracts found for motelId: " + motelId);
        }

        return contracts.stream()
                .map(contract -> {
                    return ContractMapper.INSTANCE.toResponse(contract);
                })
                .toList();
    }

    @Override
    public ContractResponse getAllContractsByRoomId(UUID roomId) {
        Contract contract = contractRepository.findByRoom_RoomId(roomId);
        if (contract == null) {
            throw new ResourceNotFoundException("Contract not found for room with id " + roomId);
        }
        return ContractMapper.INSTANCE.toResponse(contract);
    }


}
