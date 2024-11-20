package com.rrms.rrms.dto.response;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import lombok.*;
import com.rrms.rrms.enums.ContractStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractResponse {

    private UUID contractId;            // Contract ID
    private RoomResponse2 room;                // Room ID
    private TenantResponse tenant;              // Tenant ID
    private AccountResponse username;            // Landlord's username
    private ContractTemplateRespone contracttemplate;
    private UUID brokerId;              // Broker ID (if any)
    private Date moveinDate;            // Move-in date
    private String leaseTerm;           // Lease term (in months or years)
    private Date closeContract;         // Contract end date
    private String description;         // Description of the contract
    private Double debt;                // Debt amount
    private Double price;               // Price of the contract
    private Double deposit;             // Deposit amount
    private String collectioncycle;     // Collection cycle
    private LocalDate createdate;       // Contract creation date
    private String signcontract;        // Sign contract status
    private String language;            // Language of the contract
    private Integer countTenant;        // Number of tenants
    private ContractStatus status;      // Contract status (ACTIVE, ENDED, etc.)
}