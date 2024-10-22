package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.mapper.HeartMapper;
import com.rrms.rrms.models.Heart;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.HeartRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.IHeartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HeartService implements IHeartService {
    @Autowired
    private HeartRepository heartRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private HeartMapper heartMapper;

    @Override
    public HeartResponse getHeartByAccount(AccountRequest accountRequest) {
        Heart find = heartRepository.findHeartByAccount_Username(accountRequest.getUsername());
        if (find != null) {
            return heartMapper.heartToHeartResponse(find);
        } else {
            return null;
        }
    }

    @Override
    public HeartResponse addHeart(AccountResponse accountResponse, RoomDetailResponse roomDetailResponse) {
        Heart find = heartRepository.findHeartByAccount_Username(accountResponse.getUsername());
        Room room = roomRepository.getOne(roomDetailResponse.getRoomId());
        if (find != null && room != null) {
            if (!find.getRooms().contains(room)) {
                find.getRooms().add(room);
                heartRepository.save(find);
                return heartMapper.heartToHeartResponse(find);
            }
            return null;
        } else {
            return null;
        }
    }
}
