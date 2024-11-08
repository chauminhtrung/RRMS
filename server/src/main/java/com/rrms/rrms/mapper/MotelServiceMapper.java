package com.rrms.rrms.mapper;
import com.rrms.rrms.dto.response.MotelServiceResponse;
import com.rrms.rrms.models.MotelService;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface MotelServiceMapper {
  MotelServiceResponse motelServiceToMotelServiceResponse(MotelService motelService);
}

