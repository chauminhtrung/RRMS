package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.models.Heart;

@Mapper(componentModel = "spring")
public interface HeartMapper {
    HeartResponse heartToHeartResponse(Heart heart);
}
