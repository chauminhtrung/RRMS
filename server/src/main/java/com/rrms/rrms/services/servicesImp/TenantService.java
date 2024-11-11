package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.mapper.TenantMapper;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.Tenant;
import com.rrms.rrms.repositories.TenantRepository;
import com.rrms.rrms.services.ITenant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TenantService implements ITenant {
    TenantRepository tenantRepository;
    TenantMapper tenantMapper;
    @Override
    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(tenantMapper::toTenantResponse)
                .toList();
    }

    @Override
    public TenantResponse findById(UUID id) {
        return tenantRepository.findById(id)
                .map(motel -> {
                    TenantResponse response = tenantMapper.toTenantResponse(motel);
                    return response;
                })
                .orElseThrow(() -> new IllegalArgumentException("Tenant not found"));
    }

    @Override
    public TenantResponse insert(TenantRequest tenantRequest) {
        return tenantMapper.toTenantResponse(tenantRepository.save(tenantMapper.toTenant(tenantRequest)));
    }
    @Override
    public TenantResponse update(UUID id, TenantRequest tenant) {
        Optional<Tenant> tenantfind = tenantRepository.findById(id);
        if (tenantfind.isPresent()) {
            tenantfind.get().setFullname(tenant.getFullname());
            tenantfind.get().setAddress(tenant.getAddress());
            tenantfind.get().setBirthday(tenant.getBirthday());
            tenantfind.get().setEmail(tenant.getEmail());
            tenantfind.get().setBack_photo(tenant.getBackPhoto());
            tenantfind.get().setFront_photo(tenant.getFrontPhoto());
            tenantfind.get().setJob(tenant.getJob());
            tenantfind.get().setGender(tenant.getGender());
            tenantfind.get().setPhone(tenant.getPhone());
            tenantfind.get().setCCCD(tenant.getCccd());
            return tenantMapper.toTenantResponse(tenantRepository.save(tenantfind.get()));
        }
        return null;
    }




    @Override
    public void delete(UUID id) {
        Optional<Tenant> tenantfind = tenantRepository.findById(id);
        if (tenantfind.isPresent()) {
            tenantRepository.deleteById(id);
        }
    }
}
