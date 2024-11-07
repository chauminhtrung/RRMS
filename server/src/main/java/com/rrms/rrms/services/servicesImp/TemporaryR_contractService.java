package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.TemporaryR_contractRequest;
import com.rrms.rrms.dto.response.TemporaryR_contractRespone;
import com.rrms.rrms.mapper.TemporaryR_contractMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.TemporaryR_contract;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.repositories.TemporaryR_contractRepository;
import com.rrms.rrms.services.ITemporaryR_contract;

@Service
public class TemporaryR_contractService implements ITemporaryR_contract {

    @Autowired
    TemporaryR_contractRepository temporaryR_contractRepository;

    @Autowired
    private MotelRepository motelRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    TemporaryR_contractMapper temporaryRContractMapper;

    @Override
    public TemporaryR_contractRespone insert(TemporaryR_contractRequest request) {
        TemporaryR_contract contract = new TemporaryR_contract();

        // Thiết lập các trường từ request
        contract.setHouseholdhead(request.getHouseholdhead());
        contract.setRepresentativename(request.getRepresentativename());
        contract.setPhone(request.getPhone());
        contract.setBirth(request.getBirth());
        contract.setPermanentaddress(request.getPermanentaddress());
        contract.setJob(request.getJob());
        contract.setIdentifier(request.getIdentifier());
        contract.setPlaceofissue(request.getPlaceofissue());
        contract.setDateofissue(request.getDateofissue());

        // Tìm kiếm Motel và Account dựa vào motelId và tenantUsername
        Motel motel = motelRepository
                .findById(UUID.fromString(request.getMotelId()))
                .orElseThrow(() -> new RuntimeException("Motel not found"));
        contract.setMotel(motel);

        Account tenant = accountRepository
                .findByUsername(request.getTenantUsername())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        contract.setTenant(tenant);

        // Lưu TemporaryR_contract và trả về response
        temporaryR_contractRepository.save(contract);

        // Trả về TemporaryR_contractRespone
        return new TemporaryR_contractRespone(/* truyền các tham số từ đối tượng contract */ );
    }

    @Override
    public List<TemporaryR_contractRespone> findById(UUID id) {
        return temporaryR_contractRepository.findById(id).stream()
                .map(temporaryRContractMapper::TRCToTRCRespone)
                .collect(Collectors.toList());
    }

    @Override
    public List<TemporaryR_contractRespone> findTRCByAccount_Username(String username) {
        return temporaryR_contractRepository.findByTenant_Username(username).stream()
                .map(TemporaryR_contractRespone::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<TemporaryR_contractRespone> findAll() {
        List<TemporaryR_contract> contracts = temporaryR_contractRepository.findAll();

        return contracts.stream().map(TemporaryR_contractRespone::new).collect(Collectors.toList());
    }

    @Override
    public TemporaryR_contractRespone update(UUID id, TemporaryR_contractRequest temporaryR_contract) {
        Optional<TemporaryR_contract> TemporaryR_contractfind = temporaryR_contractRepository.findById(id);
        if (TemporaryR_contractfind.isPresent()) {
            TemporaryR_contractfind.get().setHouseholdhead(temporaryR_contract.getHouseholdhead());
            TemporaryR_contractfind.get().setRepresentativename(temporaryR_contract.getRepresentativename());
            TemporaryR_contractfind.get().setPhone(temporaryR_contract.getPhone());
            TemporaryR_contractfind.get().setBirth(temporaryR_contract.getBirth());
            TemporaryR_contractfind.get().setPermanentaddress(temporaryR_contract.getPermanentaddress());
            TemporaryR_contractfind.get().setJob(temporaryR_contract.getJob());
            TemporaryR_contractfind.get().setIdentifier(temporaryR_contract.getIdentifier());
            TemporaryR_contractfind.get().setPlaceofissue(temporaryR_contract.getPlaceofissue());
            TemporaryR_contractfind.get().setDateofissue(temporaryR_contract.getDateofissue());
            return temporaryRContractMapper.TRCToTRCRespone(
                    temporaryR_contractRepository.save(TemporaryR_contractfind.get()));
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        Optional<TemporaryR_contract> TemporaryR_contractfind = temporaryR_contractRepository.findById(id);
        if (TemporaryR_contractfind.isPresent()) {
            temporaryR_contractRepository.deleteById(id);
        }
    }
}
