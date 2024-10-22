package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.mapper.HeartMapper;
import com.rrms.rrms.models.Heart;
import com.rrms.rrms.repositories.HeartRepository;
import com.rrms.rrms.services.IHeartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HeartService implements IHeartService {
    @Autowired
    private HeartRepository heartRepository;
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
}
