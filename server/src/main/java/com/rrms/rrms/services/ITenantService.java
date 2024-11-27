package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;

public interface ITenantService {
    TenantResponse findById(UUID id);

    List<TenantResponse> getAllTenants();

    TenantResponse insert(UUID roomId, TenantRequest tenantRequest);

    TenantResponse update(UUID id, TenantRequest tenantRequest);

    void delete(UUID id);

    List<TenantResponse> getAllTenantsRoomId(UUID roomId);
}
