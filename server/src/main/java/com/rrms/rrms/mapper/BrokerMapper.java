package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.BrokerCreateRequest;
import com.rrms.rrms.dto.response.BrokerResponse;
import com.rrms.rrms.models.Broker;

@Mapper(componentModel = "spring")
public interface BrokerMapper {

    BrokerResponse toBrokerResponse(Broker broker);

    Broker toBroker(BrokerCreateRequest brokerCreateRequest);
}
