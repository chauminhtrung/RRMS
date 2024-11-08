package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;

import java.util.List;
import java.util.UUID;

public interface IBulletinBoard {
    List<BulletinBoardResponse> getAllBulletinBoards();

    BulletinBoardResponse getBulletinBoardById(UUID id);

    BulletinBoardResponse createBulletinBoard(BulletinBoardRequest bulletinBoardRequest);
}
