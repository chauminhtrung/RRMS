package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.models.BulletinBoard;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BulletinBoardMapper {

    BulletinBoardResponse toBulletinBoardResponse(BulletinBoard bulletinBoard);

    BulletinBoard toBulletinBoard(BulletinBoardRequest bulletinBoardRequest);
}
