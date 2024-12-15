package com.rrms.rrms.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TenantSummaryDTO {
    private UUID motelId;
    private String motelName;
    private long temporaryResidenceCount;
    private long verifiedInformationCount;
}
