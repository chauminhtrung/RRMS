package com.rrms.rrms.services.servicesImp;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.ServiceRequest;
import com.rrms.rrms.dto.response.ServiceResponse;
import com.rrms.rrms.mapper.ServiceMapper;
import com.rrms.rrms.repositories.ServiceRepository;
import com.rrms.rrms.services.IService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ServiceService implements IService {
    ServiceRepository serviceRepository;
    ServiceMapper serviceMapper;

    public ServiceResponse createService(ServiceRequest serviceRequest) {
        com.rrms.rrms.models.Service service = serviceRepository.save(serviceMapper.toService(serviceRequest));
        return serviceMapper.toServiceResponse(service);
    }
}
