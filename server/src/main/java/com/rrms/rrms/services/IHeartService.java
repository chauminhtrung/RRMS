package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.HeartResponse;

import java.util.UUID;

public interface IHeartService {

    HeartResponse getHeartByUsername(String username);

    HeartResponse addHeart(String username, UUID uuidBulletinBoard);

    HeartResponse removeHeart(String username, UUID uuidBulletinBoard);
}
