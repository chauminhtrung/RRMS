package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.models.Contract;

@Mapper(componentModel = "spring")
public interface ContractMapper {
    ContractMapper INSTANCE = Mappers.getMapper(ContractMapper.class);

    Contract toEntity(ContractRequest request);

    ContractResponse toResponse(Contract contract);
}
