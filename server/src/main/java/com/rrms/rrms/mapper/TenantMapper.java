package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.Tenant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    TenantResponse toTenantResponse(Tenant tenant);

    Tenant toTenant(TenantRequest tenantRequest);

}
