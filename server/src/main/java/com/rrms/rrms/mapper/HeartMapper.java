package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.HeartRequest;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.models.Heart;

@Mapper(componentModel = "spring")
public interface HeartMapper {
    Heart heartRequestToHeart(HeartRequest heartRequest);

    HeartResponse heartToHeartResponse(Heart heart);
}
