package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MotelMapper {
    MotelResponse motelToMotelResponse(Motel motel);
}
