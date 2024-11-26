package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.mapper.TenantMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.Tenant;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.TenantRepository;
import com.rrms.rrms.services.ITenantService;

@Service
public class TenantService implements ITenantService {
    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private TenantMapper tenantMapper;

    @Autowired
    RoomRepository roomRepository;

    @Override
    public TenantResponse insert(UUID roomId, TenantRequest tenant) {
        Room find = roomRepository.findById(roomId).orElse(null);
        if (find != null) {
            Tenant newt = tenantMapper.tenantRequestToTenant(tenant);
            newt.setRoom(find);
            return tenantMapper.toTenantResponse(tenantRepository.save(newt));
        } else {
            return null;
        }
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

            // Cập nhật các trường từ tenantRequest vào tenant hiện có
            tenantMapper.updateTenantFromRequest(tenantRequest, tenant);

            // Lưu bản ghi sau khi cập nhật
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

    @Override
    public List<TenantResponse> getAllTenantsRoomId(UUID roomId) {
        return tenantRepository.findByRoomId(roomId).stream()
                .map(tenantMapper::toTenantResponse)
                .collect(Collectors.toList());
    }



}
