package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;

import java.util.List;
import java.util.UUID;

public interface IBulletinBoard {
    List<BulletinBoardResponse> getAllBulletinBoards();

    BulletinBoardResponse getBulletinBoardById(UUID id);

    BulletinBoardResponse createBulletinBoard(BulletinBoardRequest bulletinBoardRequest);

    List<BulletinBoardTableResponse> getBulletinBoardTable(String username);
}
