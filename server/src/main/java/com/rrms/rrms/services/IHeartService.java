package com.rrms.rrms.services;

import java.util.UUID;

import com.rrms.rrms.dto.response.HeartResponse;

public interface IHeartService {

    HeartResponse getHeartByUsername(String username);

    HeartResponse addHeart(String username, UUID uuidBulletinBoard);

    HeartResponse removeHeart(String username, UUID uuidBulletinBoard);
}
