package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.TenantResponse;

import java.util.List;
import java.util.UUID;

public interface ITenant {

    List<TenantResponse> getAllTenants();
    TenantResponse insert(TenantRequest tenant);
    TenantResponse update(UUID id, TenantRequest tenant);

    void delete(UUID id);
    TenantResponse findById(UUID id);

}
