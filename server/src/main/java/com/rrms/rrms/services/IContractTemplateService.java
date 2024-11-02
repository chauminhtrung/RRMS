package com.rrms.rrms.services;


import com.rrms.rrms.dto.request.ContractTemplateRequest;
import com.rrms.rrms.dto.response.ContractTemplateRespone;

import java.util.List;
import java.util.UUID;

public interface   IContractTemplateService    {
    ContractTemplateRespone createContractTemplate(ContractTemplateRequest request);

    ContractTemplateRespone getContractTemplateById(UUID contractTemplateId);

    List<ContractTemplateRespone> getAllContractTemplates();

    List<ContractTemplateRespone> getContractTemplatesByMotelId(UUID motelid);

    ContractTemplateRespone updateContractTemplate(UUID contractTemplateId, ContractTemplateRequest request);

    void deleteContractTemplate(UUID contractTemplateId);
}
