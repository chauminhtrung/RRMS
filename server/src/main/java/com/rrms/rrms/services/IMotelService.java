package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;

public interface IMotelService {
    MotelResponse insert(MotelRequest motel);

    MotelResponse findById(UUID id);

    List<MotelResponse> findAllByMotelName(String motelName);


    List<MotelResponse> findAll();

    MotelResponse update(UUID id, MotelRequest motel);

    void delete(UUID id);
}
