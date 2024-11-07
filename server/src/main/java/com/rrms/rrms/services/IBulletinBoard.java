package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.response.BulletinBoardResponse;

public interface IBulletinBoard {
    List<BulletinBoardResponse> getAllBulletinBoards();

    BulletinBoardResponse getBulletinBoardById(UUID id);
}
