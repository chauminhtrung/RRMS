package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.HeartRequest;
import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.models.Heart;

import java.util.List;

public interface IHeartService {

    HeartResponse getHeartByAccount(AccountRequest accountRequest);

    HeartResponse addHeart(AccountResponse accountResponse, RoomDetailResponse roomDetailResponse);
    HeartResponse removeHeart(AccountResponse accountResponse, RoomDetailResponse roomDetailResponse);
}
