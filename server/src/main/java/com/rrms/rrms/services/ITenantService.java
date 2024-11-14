package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.TenantResponse;

import java.util.List;
import java.util.UUID;

public interface ITenantService {
    TenantResponse findById(UUID id);
    List<TenantResponse> getAllTenants();
    TenantResponse insert(TenantRequest tenantRequest);
    TenantResponse update(UUID id, TenantRequest tenantRequest);
    void delete(UUID id);

    List<TenantResponse> findByAuthenIs(Boolean authenis);

    List<TenantResponse> findAllByDatenew();
}
