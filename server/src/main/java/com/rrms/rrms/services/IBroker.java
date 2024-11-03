package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.BrokerCreateRequest;
import com.rrms.rrms.dto.response.BrokerResponse;

public interface IBroker {

    BrokerResponse createBroker(BrokerCreateRequest brokerRequest);

    List<BrokerResponse> getAllBroker(UUID motelId);
}
