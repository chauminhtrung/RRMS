package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.mapper.MotelMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.IMotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MotelService implements IMotelService {
    @Autowired
    private MotelRepository motelRepository;
    @Autowired
    private MotelMapper motelMapper;

    @Override
    public MotelResponse insert(Motel motel) {
        return motelMapper.motelToMotelResponse(motelRepository.save(motel));
    }

    @Override
    public MotelResponse findById(UUID id) {
        return motelMapper.motelToMotelResponse(motelRepository.findById(id).orElse(null));
    }

    @Override
    public List<MotelResponse> findAll() {
        return motelRepository.findAll()
                .stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MotelResponse update(UUID id, Motel motel) {
//        Motel motelfind = findById(id);
//        motelfind.setMotelName(motel.getMotelName());
//        motelfind.setArea(motel.getArea());
//        motelfind.setAveragePrice(motel.getAveragePrice());
//        motelfind.setAddress(motel.getAddress());
//        motelfind.setAccount(motel.getAccount());
//        return motelRepository.save(motel);
        return null;
    }

    @Override
    public void delete(UUID id) {
        motelRepository.deleteById(id);
    }

    @Override
    public Integer getTotalAreaByUsername(Account username) {
        return motelRepository.findTotalAreaByUsername(username);
    }
}
