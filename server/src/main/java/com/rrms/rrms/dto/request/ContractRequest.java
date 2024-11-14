package com.rrms.rrms.dto.request;


import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import lombok.Data;
import com.rrms.rrms.enums.ContractStatus;

@Data
public class ContractRequest {

    private UUID roomId;
    private String tenantUsername;
    private String landlordUsername;
    private UUID contractTemplateId;
    private UUID brokerId;

    private Date moveinDate;
    private String leaseTerm;
    private Date closeContract;
    private String description;
    private Double debt;
    private Double price;
    private Double deposit;
    private String collectionCycle;
    private LocalDate createdate;
    private String signContract;
    private LocalDate language;
    private Integer countTenant;
    private ContractStatus status;
}
