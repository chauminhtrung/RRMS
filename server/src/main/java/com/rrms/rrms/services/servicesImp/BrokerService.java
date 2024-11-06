package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.BrokerCreateRequest;
import com.rrms.rrms.dto.response.BrokerResponse;
import com.rrms.rrms.mapper.BrokerMapper;
import com.rrms.rrms.repositories.BrokerRepository;
import com.rrms.rrms.services.IBroker;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BrokerService implements IBroker {

    BrokerMapper brokerMapper;

    BrokerRepository brokerRepository;

    @Override
    public BrokerResponse createBroker(BrokerCreateRequest brokerRequest) {
        return brokerMapper.toBrokerResponse(brokerRepository.save(brokerMapper.toBroker(brokerRequest)));
    }

    @Override
    public List<BrokerResponse> getAllBroker(UUID motelId) {
        return brokerRepository.findByMotelId(motelId).stream()
                .map(brokerMapper::toBrokerResponse)
                .toList();
    }
}
