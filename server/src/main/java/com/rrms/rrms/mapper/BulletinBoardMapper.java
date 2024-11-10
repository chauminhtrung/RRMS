package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.models.BulletinBoard;

@Mapper(componentModel = "spring")
public interface BulletinBoardMapper {

    BulletinBoardResponse toBulletinBoardResponse(BulletinBoard bulletinBoard);

    BulletinBoard toBulletinBoard(BulletinBoardRequest bulletinBoardRequest);

    BulletinBoardTableResponse toBulletinBoardTableResponse(BulletinBoard bulletinBoard);

    BulletinBoardSearchResponse toBulletinBoardSearchResponse(BulletinBoard bulletinBoard);
}
