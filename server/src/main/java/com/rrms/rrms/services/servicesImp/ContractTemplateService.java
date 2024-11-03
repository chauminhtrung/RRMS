package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.ContractTemplateRequest;
import com.rrms.rrms.dto.response.ContractTemplateRespone;
import com.rrms.rrms.models.ContractTemplate;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.ContractTemplateRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.IContractTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContractTemplateService implements IContractTemplateService {

    @Autowired
    private ContractTemplateRepository contractTemplateRepository;

    @Autowired
    private MotelRepository motelRepository;


    @Override
    public ContractTemplateRespone createContractTemplate(ContractTemplateRequest request) {
        Motel motel = motelRepository.findById(request.getMotelId()).orElse(null);

        ContractTemplate contractTemplate = new ContractTemplate();
        contractTemplate.setMotel(motel);
        contractTemplate.setTemplatename(request.getTemplatename());
        contractTemplate.setNamecontract(request.getNamecontract());
        contractTemplate.setSortorder(request.getSortOrder());
        contractTemplate.setContent(request.getContent());

        contractTemplate = contractTemplateRepository.save(contractTemplate);
        return toResponse(contractTemplate);
    }

    @Override
    public ContractTemplateRespone getContractTemplateById(UUID contractTemplateId) {
        ContractTemplate contractTemplate = contractTemplateRepository.findById(contractTemplateId).orElse(null);
        return contractTemplate != null ? toResponse(contractTemplate) : null;
    }

    @Override
    public List<ContractTemplateRespone> getAllContractTemplates() {
        List<ContractTemplate> templates = contractTemplateRepository.findAll();
        return templates.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<ContractTemplateRespone> getContractTemplatesByMotelId(UUID motelid) {
        List<ContractTemplate> templates = contractTemplateRepository.findContractTemplateByMotel_MotelId(motelid);
        return templates.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ContractTemplateRespone updateContractTemplate(UUID contractTemplateId, ContractTemplateRequest request) {
        ContractTemplate contractTemplate = contractTemplateRepository.findById(contractTemplateId).orElse(null);
        if (contractTemplate == null) {
            return null;
        }

        Motel motel = motelRepository.findById(request.getMotelId()).orElse(null);
        contractTemplate.setMotel(motel);
        contractTemplate.setTemplatename(request.getTemplatename());
        contractTemplate.setNamecontract(request.getNamecontract());
        contractTemplate.setSortorder(request.getSortOrder());
        contractTemplate.setContent(request.getContent());

        contractTemplate = contractTemplateRepository.save(contractTemplate);
        return toResponse(contractTemplate);
    }

    @Override
    public void deleteContractTemplate(UUID contractTemplateId) {
        contractTemplateRepository.deleteById(contractTemplateId);
    }

    private ContractTemplateRespone toResponse(ContractTemplate contractTemplate) {
        ContractTemplateRespone response = new ContractTemplateRespone();
        response.setContractTemplateId(contractTemplate.getContracttemplateId());
        response.setMotelId(contractTemplate.getMotel().getMotelId());
        response.setNamecontract(contractTemplate.getNamecontract());
        response.setTemplatename(contractTemplate.getTemplatename());
        response.setSortOrder(contractTemplate.getSortorder());
        response.setContent(contractTemplate.getContent());
        return response;
    }
}
