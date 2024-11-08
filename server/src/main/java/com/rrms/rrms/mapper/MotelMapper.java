package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MotelMapper {
    @Mapping(target = "motelServices", source = "motelServices")
    MotelResponse motelToMotelResponse(Motel motel);

    Motel motelRequestToMotel(MotelRequest motelRequest);
}
