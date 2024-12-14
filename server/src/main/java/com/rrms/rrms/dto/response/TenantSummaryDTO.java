package com.rrms.rrms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class TenantSummaryDTO {
    private UUID motelId;
    private String motelName;
    private long temporaryResidenceCount;
    private long verifiedInformationCount;
}
