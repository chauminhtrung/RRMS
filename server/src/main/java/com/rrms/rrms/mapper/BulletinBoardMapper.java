package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.models.BulletinBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BulletinBoardMapper {

    BulletinBoardResponse toBulletinBoardResponse(BulletinBoard bulletinBoard);

    BulletinBoard toBulletinBoard(BulletinBoardRequest bulletinBoardRequest);

    BulletinBoardTableResponse toBulletinBoardTableResponse(BulletinBoard bulletinBoard);

    BulletinBoardSearchResponse toBulletinBoardSearchResponse(BulletinBoard bulletinBoard);

    @Mapping(target = "bulletinBoardId", ignore = true) // Không ghi đè ID
    @Mapping(target = "account", ignore = true)
        // Không ghi đè tài khoản
    void updateBulletinBoardFromRequest(
            BulletinBoardRequest bulletinBoardRequest, @MappingTarget BulletinBoard bulletinBoard);


}
