package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.mapper.TenantMapper;
import com.rrms.rrms.models.Tenant;
import com.rrms.rrms.repositories.TenantRepository;
import com.rrms.rrms.services.ITenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TenantService implements ITenantService {
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private TenantMapper tenantMapper;

    @Override
    public TenantResponse insert(TenantRequest tenant) {
        return tenantMapper.toTenantResponse(tenantRepository.save(tenantMapper.tenantRequestToTenant(tenant)));
    }

    @Override
    public TenantResponse findById(UUID id) {
        return tenantRepository
                .findById(id)
                .map(tenant -> {
                    TenantResponse response = tenantMapper.toTenantResponse(tenant);
                    return response;
                })
                .orElseThrow(() -> new IllegalArgumentException("Tenant not found"));
    }


    @Override
    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(tenantMapper::toTenantResponse)
                .collect(Collectors.toList());
    }


    @Override
    public TenantResponse update(UUID id, TenantRequest tenantRequest) {
        // Tìm tenant theo id
        Optional<Tenant> tenantFind = tenantRepository.findById(id);
        if (tenantFind.isPresent()) {
            Tenant tenant = tenantFind.get();

            // Cập nhật thông tin từ tenantRequest vào tenant entity
            tenant.setFullname(tenantRequest.getFullname());
            tenant.setPhone(tenantRequest.getPhone());
            tenant.setCccd(tenantRequest.getCccd());
            tenant.setEmail(tenantRequest.getEmail());
            tenant.setBirthday(tenantRequest.getBirthday());
            tenant.setGender(tenantRequest.getGender());
            tenant.setAddress(tenantRequest.getAddress());
            tenant.setJob(tenantRequest.getJob());
            tenant.setLicenseDate(tenantRequest.getLicenseDate());
            tenant.setPlaceOfLicense(tenantRequest.getPlaceOfLicense());
            tenant.setFrontPhoto(tenantRequest.getFrontPhoto());
            tenant.setBackPhoto(tenantRequest.getBackPhoto());
            tenant.setRole(tenantRequest.getRole());
            tenant.setTemporaryResidence(tenantRequest.getTemporaryResidence());
            tenant.setInformationVerify(tenantRequest.getInformationVerify());

            // Lưu lại và trả về response
            return tenantMapper.toTenantResponse(tenantRepository.save(tenant));
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        Optional<Tenant> tenant = tenantRepository.findById(id);
        if (tenant.isPresent()) {
            tenantRepository.deleteById(id);
        }
    }

}
