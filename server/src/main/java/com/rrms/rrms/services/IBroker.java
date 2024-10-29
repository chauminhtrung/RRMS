package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BrokerCreateRequest;
import com.rrms.rrms.dto.response.BrokerResponse;

import java.util.List;
import java.util.UUID;

public interface IBroker {

    BrokerResponse createBroker(BrokerCreateRequest brokerRequest);

    List<BrokerResponse> getAllBroker(UUID motelId);
}
