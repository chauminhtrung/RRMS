package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.ContractServiceRequest;
import com.rrms.rrms.dto.response.ContractServiceResponse;
import com.rrms.rrms.models.ContractService;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.repositories.ContractServiceRepository;
import com.rrms.rrms.repositories.MotelServiceRepository;
import com.rrms.rrms.services.IContractServiceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractServiceService implements IContractServiceService {
    private final ContractServiceRepository contractServiceRepository;
    private final ContractRepository contractRepository;
    private final MotelServiceRepository motelServiceRepository;

    @Override
    public ContractServiceResponse createContractService(ContractServiceRequest request) {
        var contract = contractRepository
                .findById(request.getContractId())
                .orElseThrow(() -> new IllegalArgumentException("Contract not found"));

        var service = motelServiceRepository
                .findById(request.getServiceId())
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));

        ContractService contractService =
                ContractService.builder().contract(contract).service(service).build();

        ContractService savedService = contractServiceRepository.save(contractService);
        return mapToResponse(savedService);
    }

    @Override
    public ContractServiceResponse updateContractService(UUID contractServiceId, ContractServiceRequest request) {
        ContractService contractService = contractServiceRepository
                .findById(contractServiceId)
                .orElseThrow(() -> new IllegalArgumentException("ContractService not found"));

        var contract = contractRepository
                .findById(request.getContractId())
                .orElseThrow(() -> new IllegalArgumentException("Contract not found"));

        var service = motelServiceRepository
                .findById(request.getServiceId())
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));

        contractService.setContract(contract);
        contractService.setService(service);

        ContractService updatedService = contractServiceRepository.save(contractService);
        return mapToResponse(updatedService);
    }

    @Override
    public void deleteContractService(UUID contractServiceId) {
        if (!contractServiceRepository.existsById(contractServiceId)) {
            throw new IllegalArgumentException("ContractService not found");
        }
        contractServiceRepository.deleteById(contractServiceId);
    }

    @Override
    public ContractServiceResponse getContractServiceById(UUID contractServiceId) {
        ContractService contractService = contractServiceRepository
                .findById(contractServiceId)
                .orElseThrow(() -> new IllegalArgumentException("ContractService not found"));
        return mapToResponse(contractService);
    }

    @Override
    public List<ContractServiceResponse> getAllContractServices() {
        return contractServiceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ContractServiceResponse mapToResponse(ContractService contractService) {
        return ContractServiceResponse.builder()
                .contractServiceId(contractService.getContractServiceId())
                .contractId(contractService.getContract().getContractId())
                .serviceId(contractService.getService().getServiceId())
                .build();
    }
}
