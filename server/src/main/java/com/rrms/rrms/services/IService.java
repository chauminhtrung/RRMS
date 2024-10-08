package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.ServiceRequest;
import com.rrms.rrms.dto.response.ServiceResponse;

public interface IService {

    ServiceResponse createService(ServiceRequest serviceRequest);
}
