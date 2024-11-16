package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.models.Contract;
import org.mapstruct.factory.Mappers;

public interface  ContractMapper {
    ContractMapper INSTANCE = Mappers.getMapper(ContractMapper.class);

    Contract toEntity(ContractRequest request);

    ContractResponse toResponse(Contract contract);
}
