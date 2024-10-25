package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;

@Mapper(componentModel = "spring")
public interface MotelMapper {
    MotelResponse motelToMotelResponse(Motel motel);

    Motel motelRequestToMotel(MotelRequest motelRequest);
}
