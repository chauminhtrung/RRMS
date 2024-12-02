package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.ReserveAPlaceRequest;
import com.rrms.rrms.dto.response.ReserveAPlaceResponse;

public interface IReserveAPlaceService {
    ReserveAPlaceResponse createReserveAPlace(ReserveAPlaceRequest request);

    ReserveAPlaceResponse getReserveAPlaceById(UUID id);

    List<ReserveAPlaceResponse> getAllReserveAPlaces();

    ReserveAPlaceResponse updateReserveAPlace(UUID id, ReserveAPlaceRequest request);

    void deleteReserveAPlace(UUID id);

    List<ReserveAPlaceResponse> getReserveAPlacesByRoomId(UUID roomId); // Thêm mới
}
