package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.models.Contract;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface  ContractMapper {
    ContractMapper INSTANCE = Mappers.getMapper(ContractMapper.class);

    Contract toEntity(ContractRequest request);

    @Mapping(source = "room", target = "room")  // Ánh xạ Room đối tượng đầy đủ
    @Mapping(source = "tenant", target = "tenant")  // Ánh xạ Tenant đối tượng đầy đủ
    @Mapping(source = "account", target = "username")  // Ánh xạ Account đối tượng đầy đủ
    @Mapping(source = "contract_template", target = "contracttemplate")  // Ánh xạ ContractTemplate đối tượng đầy đủ
    ContractResponse toResponse(Contract contract);
}
