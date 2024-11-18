package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.models.Tenant;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    TenantResponse toTenantResponse(Tenant tenant);

    Tenant tenantRequestToTenant(TenantRequest tenantRequest);

    void updateTenantFromRequest(TenantRequest tenantRequest, @MappingTarget Tenant tenant);
}
