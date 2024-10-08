package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RoomReviewRequest;
import com.rrms.rrms.dto.response.RoomReviewResponse;

public interface IRoomReview {
    RoomReviewResponse createRoomReview(RoomReviewRequest request);
}
