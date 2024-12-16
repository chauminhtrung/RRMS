package com.rrms.rrms.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.MotelRoomCountResponse;

public interface IMotelService {

    Optional<Integer> getTotalRooms(UUID motelId, String username);

    MotelResponse insert(MotelRequest motel);

    MotelResponse findById(UUID id);

    List<MotelResponse> findAllByMotelName(String motelName);

    List<MotelResponse> findMotelByAccount_Username(String username);

    List<MotelResponse> findAll();

    MotelResponse update(UUID id, MotelRequest motel);

    void delete(UUID id);

    List<MotelRoomCountResponse> getRoomCountsByContractStatus();

    Double calculateTotalDeposit(UUID motelId);

    Double calculateTotalReserveDeposit(UUID motelId);

    BigDecimal getTotalPaidInvoices(UUID motelId);

    BigDecimal getTotalPaidRoomPrice(UUID motelId);
}
