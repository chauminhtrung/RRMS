package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;

public interface IHeartService {

    HeartResponse getHeartByAccount(AccountRequest accountRequest);

    HeartResponse addHeart(AccountResponse accountResponse, RoomDetailResponse roomDetailResponse);

    HeartResponse removeHeart(AccountResponse accountResponse, RoomDetailResponse roomDetailResponse);
}
