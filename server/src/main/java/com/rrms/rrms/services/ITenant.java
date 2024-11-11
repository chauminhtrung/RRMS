package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.dto.response.TenantResponse;

import java.util.List;
import java.util.UUID;

public interface ITenantService {
    List<TenantResponse> getAllTenants();
    

    TenantResponse createTenantResponse(TenantRequest tenantRequest);


}
