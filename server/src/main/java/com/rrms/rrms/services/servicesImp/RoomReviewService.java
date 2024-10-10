package com.rrms.rrms.services.servicesImp;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.RoomReviewRequest;
import com.rrms.rrms.dto.response.RoomReviewResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomReviewMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomReview;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.RoomReviewRepository;
import com.rrms.rrms.services.IRoomReview;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomReviewService implements IRoomReview {
    RoomReviewRepository roomReviewRepository;
    AccountRepository accountRepository;
    RoomRepository roomRepository;
    RoomReviewMapper roomReviewMapper;

    @Override
    public RoomReviewResponse createRoomReview(RoomReviewRequest request) {
        Account account = accountRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        Room room = roomRepository
                .findById(request.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        RoomReview roomReview = RoomReview.builder()
                .account(account)
                .comment(request.getComment())
                .rating(request.getRating())
                .room(room)
                .build();
        roomReviewRepository.save(roomReview);
        return roomReviewMapper.toRoomReviewResponse(roomReview);
    }
}
