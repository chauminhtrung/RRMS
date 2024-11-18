package com.rrms.rrms.dto.request;


import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import lombok.Data;
import com.rrms.rrms.enums.ContractStatus;

@Data
public class ContractRequest {

    private UUID roomId;                // ID of the room
    private UUID tenantId;              // ID of the tenant
    private String username;            // Landlord's username
    private UUID contracttemplateId;    // ID of the contract template
    private UUID brokerId;              // Optional broker ID
    private Date moveinDate;            // Move-in date
    private String leaseTerm;           // Lease term (in months or years)
    private Date closeContract;         // Contract end date
    private String description;         // Description of the contract
    private Double debt;                // Debt amount
    private Double price;               // Price of the contract
    private Double deposit;             // Deposit amount
    private String collectionCycle;     // Collection cycle (e.g., monthly, quarterly)
    private LocalDate createdate;       // Contract creation date
    private String signContract;        // Sign contract status
    private String language;            // Language of the contract
    private Integer countTenant;        // Number of tenants
    private ContractStatus status;      // Status of the contract (ACTIVE, ENDED, etc.)
}