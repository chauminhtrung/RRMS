package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import org.mapstruct.Mapper;

import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.models.BulletinBoard;

@Mapper(componentModel = "spring")
public interface BulletinBoardMapper {

    BulletinBoardResponse toBulletinBoardResponse(BulletinBoard bulletinBoard);

    BulletinBoardSearchResponse toBulletinBoardSearchResponse(BulletinBoard bulletinBoard);
}
