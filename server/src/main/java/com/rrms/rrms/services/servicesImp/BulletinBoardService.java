package com.rrms.rrms.services.servicesImp;


import co.elastic.clients.elasticsearch.ElasticsearchClient;
import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.BulletinBoardMapper;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.IBulletinBoard;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@Transactional(propagation = Propagation.REQUIRED)
public class BulletinBoardService implements IBulletinBoard {

    BulletinBoardRepository bulletinBoardRepository;
    BulletinBoardImageRepository bulletinBoardImageRepository;
    BulletinBoardRuleRepository bulletinBoardRuleRepository;
    BulletinBoards_RentalAmRepository bulletinBoards_RentalAmRepository;
    RentalAmenitiesRepository rentalAmenitiesRepository;
    RuleRepository ruleRepository;
    AccountRepository accountRepository;
    BulletinBoardElasticsearchRepository bulletinBoardElasticsearchRepository;

    BulletinBoardMapper bulletinBoardMapper;

    ElasticsearchClient elasticsearchClient;

    @Override
    public List<BulletinBoardResponse> getAllBulletinBoards() {
        return bulletinBoardRepository.findAll().stream()
                .map(bulletinBoardMapper::toBulletinBoardResponse)
                .toList();
    }

    @Override
    public BulletinBoardResponse getBulletinBoardById(UUID id) {
        return bulletinBoardMapper.toBulletinBoardResponse(bulletinBoardRepository
                .findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BULLETIN_BOARD_NOT_FOUND)));
    }

    @Override
    public BulletinBoardResponse createBulletinBoard(BulletinBoardRequest bulletinBoardRequest) {
        Account account = accountRepository
                .findByUsername(bulletinBoardRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        BulletinBoard bulletinBoard = bulletinBoardMapper.toBulletinBoard(bulletinBoardRequest);
        bulletinBoard.setAccount(account);
        bulletinBoard = bulletinBoardRepository.save(bulletinBoard);

        for (BulletinBoardImage image : bulletinBoardRequest.getBulletinBoardImages()) {
            BulletinBoardImage bulletinBoardImage = new BulletinBoardImage();
            bulletinBoardImage.setBulletinBoard(bulletinBoard);
            bulletinBoardImage.setImageLink(image.getImageLink());

            if (bulletinBoardImage.getBulletinBoard() == null) {
                bulletinBoardImage.setBulletinBoard(bulletinBoard);
            }

            bulletinBoardImageRepository.save(bulletinBoardImage);
        }

        for (BulletinBoardRule bulletinRule : bulletinBoardRequest.getBulletinBoardRules()) {
            Rule rule = bulletinRule.getRule();
            if (rule != null) {
                rule = ruleRepository.save(rule);
            } else {
                rule = new Rule();
                rule = ruleRepository.save(rule);
            }

            BulletinBoardRule bulletinBoardRule = new BulletinBoardRule();
            bulletinBoardRule.setBulletinBoard(bulletinBoard);
            bulletinBoardRule.setRule(rule);

            bulletinBoardRuleRepository.save(bulletinBoardRule);
        }

        for (BulletinBoards_RentalAm rentalAm : bulletinBoardRequest.getBulletinBoards_RentalAm()) {
            Optional<RentalAmenities> rentalAmenitiesOptional = rentalAmenitiesRepository.findByName(
                    rentalAm.getRentalAmenities().getName());

            RentalAmenities rentalAmenities;
            if (rentalAmenitiesOptional.isPresent()) {
                rentalAmenities = rentalAmenitiesOptional.get();
            } else {
                rentalAmenities = new RentalAmenities();
                rentalAmenities.setName(rentalAm.getRentalAmenities().getName());
                rentalAmenities = rentalAmenitiesRepository.save(rentalAmenities);
            }

            BulletinBoards_RentalAm bulletinBoards_RentalAm = new BulletinBoards_RentalAm();
            bulletinBoards_RentalAm.setBulletinBoard(bulletinBoard);
            bulletinBoards_RentalAm.setRentalAmenities(rentalAmenities);

            bulletinBoards_RentalAmRepository.save(bulletinBoards_RentalAm);
        }

        return bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard);
    }

    @Transactional
    @Override
    public BulletinBoardResponse updateBulletinBoard(UUID bulletinBoardId, BulletinBoardRequest bulletinBoardRequest) {
        // Lấy BulletinBoard hiện tại
        BulletinBoard bulletinBoard = bulletinBoardRepository
                .findById(bulletinBoardId)
                .orElseThrow(() -> new ResourceNotFoundException("BulletinBoard not found"));
        System.out.println("bulletinBoard id " + bulletinBoard.getBulletinBoardId());

        // Cập nhật các trường cơ bản
        bulletinBoardMapper.updateBulletinBoardFromRequest(bulletinBoardRequest, bulletinBoard);

        // Cập nhật danh sách hình ảnh
        if (bulletinBoardRequest.getBulletinBoardImages() != null) {
            bulletinBoardImageRepository.deleteAllByBulletinBoard(bulletinBoard);
            for (BulletinBoardImage image : bulletinBoardRequest.getBulletinBoardImages()) {
                BulletinBoardImage bulletinBoardImage = new BulletinBoardImage();
                bulletinBoardImage.setBulletinBoard(bulletinBoard); // Đảm bảo rằng bulletinBoard được gán đúng
                bulletinBoardImage.setImageLink(image.getImageLink());
                bulletinBoardImageRepository.save(bulletinBoardImage);
            }
        }

        // Cập nhật danh sách quy tắc
        if (bulletinBoardRequest.getBulletinBoardRules() != null) {
            bulletinBoardRuleRepository.deleteAllByBulletinBoard(bulletinBoard);
            for (BulletinBoardRule bulletinRule : bulletinBoardRequest.getBulletinBoardRules()) {
                Rule rule = bulletinRule.getRule();
                if (rule != null) {
                    rule = ruleRepository.save(rule);
                } else {
                    rule = new Rule();
                    rule = ruleRepository.save(rule);
                }

                BulletinBoardRule bulletinBoardRule = new BulletinBoardRule();
                bulletinBoardRule.setBulletinBoard(bulletinBoard); // Đảm bảo rằng bulletinBoard được gán đúng
                bulletinBoardRule.setRule(rule);
                bulletinBoardRuleRepository.save(bulletinBoardRule);
            }
        }

        // Cập nhật danh sách tiện ích
        if (bulletinBoardRequest.getBulletinBoards_RentalAm() != null) {
            bulletinBoards_RentalAmRepository.deleteAllByBulletinBoard(bulletinBoard);
            for (BulletinBoards_RentalAm rentalAm : bulletinBoardRequest.getBulletinBoards_RentalAm()) {
                Optional<RentalAmenities> rentalAmenitiesOptional = rentalAmenitiesRepository.findByName(
                        rentalAm.getRentalAmenities().getName());

                RentalAmenities rentalAmenities;
                if (rentalAmenitiesOptional.isPresent()) {
                    rentalAmenities = rentalAmenitiesOptional.get();
                } else {
                    rentalAmenities = new RentalAmenities();
                    rentalAmenities.setName(rentalAm.getRentalAmenities().getName());
                    rentalAmenities = rentalAmenitiesRepository.save(rentalAmenities);
                }

                BulletinBoards_RentalAm bulletinBoards_RentalAm = new BulletinBoards_RentalAm();
                bulletinBoards_RentalAm.setBulletinBoard(bulletinBoard); // Đảm bảo rằng bulletinBoard được gán đúng
                bulletinBoards_RentalAm.setRentalAmenities(rentalAmenities);
                bulletinBoards_RentalAmRepository.save(bulletinBoards_RentalAm);
            }
        }

        // Lưu lại và trả về kết quả
        bulletinBoard = bulletinBoardRepository.save(bulletinBoard); // Lưu lại bản cập nhật
        return bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard);
    }

    @Override
    public List<BulletinBoardTableResponse> getBulletinBoardTable(String username) {
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        List<BulletinBoard> bulletinBoards = bulletinBoardRepository.findByAccount(account);
        return bulletinBoards.stream()
                .map(bulletinBoardMapper::toBulletinBoardTableResponse)
                .toList();
    }

    @Override
    public List<BulletinBoardResponse> getBulletinBoard() {
        List<BulletinBoard> bulletinBoards = bulletinBoardRepository.findAllByIsActive(false);
        return bulletinBoards.stream()
                .map(bulletinBoardMapper::toBulletinBoardResponse)
                .toList();
    }

    @Override
    public List<BulletinBoardSearchResponse> searchBulletinBoards(String address) {
        return bulletinBoardElasticsearchRepository.findByAddress(address);
    }


    public BulletinBoard approveBulletinBoard(UUID id) {
        BulletinBoard bulletinBoard = bulletinBoardRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BulletinBoard not found"));
        bulletinBoard.setIsActive(true);
        return bulletinBoardRepository.save(bulletinBoard);
    }

    public void deleteBulletinBoard(UUID id) {
        bulletinBoardRepository.deleteById(id);
    }

    @Override
    public BulletinBoardSearchResponse findByBulletinBoardId(UUID id) {
        return bulletinBoardMapper.toBulletinBoardSearchResponse(bulletinBoardRepository.findByBulletinBoardId(id));
    }
}
