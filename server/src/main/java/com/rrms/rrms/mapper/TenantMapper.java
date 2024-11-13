package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.models.Tenant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    TenantResponse toTenantResponse(Tenant tenant);

    Tenant tenantRequestToTenant(TenantRequest tenantRequest);

}
