package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.mapper.HeartMapper;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.Heart;
import com.rrms.rrms.repositories.BulletinBoardRepository;
import com.rrms.rrms.repositories.HeartRepository;
import com.rrms.rrms.services.IHeartService;

@Service
public class HeartService implements IHeartService {
    @Autowired
    private HeartRepository heartRepository;

    @Autowired
    private BulletinBoardRepository bulletinBoardRepository;

    @Autowired
    private HeartMapper heartMapper;

    @Override
    public HeartResponse getHeartByUsername(String username) {
        Heart find = heartRepository.findAllByAccountUsername(username);
        if (find != null) {
            return heartMapper.heartToHeartResponse(find);
        }
        return null;
    }

    @Override
    public HeartResponse addHeart(String username, UUID uuidBulletinBoard) {
        Heart heart = heartRepository.findAllByAccountUsername(username);
        BulletinBoard bulletinBoard =
                bulletinBoardRepository.findById(uuidBulletinBoard).get();
        if (heart != null && bulletinBoard != null) {
            List<BulletinBoard> arr = heart.getBulletinBoards();
            arr.add(bulletinBoard);
            heart.setBulletinBoards(arr);
            heartRepository.save(heart);
            return heartMapper.heartToHeartResponse(heart);
        } else {
            return null;
        }
    }

    @Override
    public HeartResponse removeHeart(String username, UUID uuidBulletinBoard) {
        Heart heart = heartRepository.findAllByAccountUsername(username);
        BulletinBoard bulletinBoard =
                bulletinBoardRepository.findById(uuidBulletinBoard).get();
        if (heart != null && bulletinBoard != null) {
            List<BulletinBoard> arr = heart.getBulletinBoards();
            if (arr.contains(bulletinBoard)) {
                arr.remove(bulletinBoard);
                heart.setBulletinBoards(arr);
                heartRepository.save(heart);
            }
            return heartMapper.heartToHeartResponse(heart);
        } else {
            return null;
        }
    }
}
