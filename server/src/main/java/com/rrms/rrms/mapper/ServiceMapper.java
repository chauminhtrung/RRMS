package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.ServiceRequest;
import com.rrms.rrms.dto.response.ServiceResponse;
import com.rrms.rrms.models.Service;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    Service toService(ServiceRequest serviceRequest);

    ServiceResponse toServiceResponse(Service service);
}
