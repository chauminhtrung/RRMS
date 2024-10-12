package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;

public interface IMotelService {
    public MotelResponse insert(MotelRequest motel);

//    public List<MotelResponse> findByMotelName(String motelName);

    public List<MotelResponse> findAll();

    public MotelResponse update(UUID id, MotelRequest motel);

    public void delete(UUID id);
}
