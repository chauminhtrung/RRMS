package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.models.BulletinBoard;

import java.util.List;
import java.util.UUID;

public interface IBulletinBoard {
    List<BulletinBoardResponse> getAllBulletinBoards();

    BulletinBoardResponse getBulletinBoardById(UUID id);

    BulletinBoardResponse createBulletinBoard(BulletinBoardRequest bulletinBoardRequest);

    BulletinBoardResponse updateBulletinBoard(UUID bulletinBoardId, BulletinBoardRequest bulletinBoardRequest);

    List<BulletinBoardTableResponse> getBulletinBoardTable(String username);

    List<BulletinBoardResponse> getBulletinBoard();

    List<BulletinBoardSearchResponse> searchBulletinBoards(String address);

    BulletinBoard approveBulletinBoard(UUID id);

    void deleteBulletinBoard(UUID id);

    BulletinBoardSearchResponse findByBulletinBoardId(UUID id);

}
