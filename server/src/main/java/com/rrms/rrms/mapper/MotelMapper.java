package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.response.MotelServiceResponse;
import com.rrms.rrms.models.MotelService;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MotelMapper {
    @Mapping(target = "motelServices", source = "motelServices")
    MotelResponse motelToMotelResponse(Motel motel);

    Motel motelRequestToMotel(MotelRequest motelRequest);

    @Mapping(target = "motelId", source = "motel.motelId") // ánh xạ motelId
    MotelServiceResponse motelServiceToMotelServiceResponse(MotelService motelService); // thêm ánh xạ mới

    // Phương thức mặc định để ánh xạ danh sách motel services
    default List<MotelServiceResponse> mapMotelServices(List<MotelService> motelServices) {
        if (motelServices == null) {
            return Collections.emptyList();
        }
        return motelServices.stream()
            .map(this::motelServiceToMotelServiceResponse)
            .collect(Collectors.toList());
    }
}


