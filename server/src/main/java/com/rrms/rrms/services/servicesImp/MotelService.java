package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.rrms.rrms.dto.request.MotelRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.mapper.MotelMapper;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.IMotelService;

@Service
public class MotelService implements IMotelService {
    @Autowired
    private MotelRepository motelRepository;
    @Autowired
    private MotelMapper motelMapper;

    @Override
    public MotelResponse insert(MotelRequest motel) {
        return motelMapper.motelToMotelResponse(motelRepository.save(motelMapper.motelRequestToMotel(motel)));
    }
//    @Override
//    public List<MotelResponse> findByMotelName(String motelName) {
//        return motelMapper.motelToMotelResponse(motelRepository.findMotelByMotelName(motelName));
//    }

    @Override
    public List<MotelResponse> findAll() {
        return List.of();
    }

    @Override
    public MotelResponse update(UUID id, MotelRequest motel) {
        return null;
    }

    @Override
    public void delete(UUID id) {

    }
}
