package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
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

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class BulletinBoardService implements IBulletinBoard {

    BulletinBoardRepository bulletinBoardRepository;
    BulletinBoardImageRepository bulletinBoardImageRepository;
    BulletinBoardRuleRepository bulletinBoardRuleRepository;
    BulletinBoards_RentalAmRepository bulletinBoards_RentalAmRepository;
    RentalAmenitiesRepository rentalAmenitiesRepository;
    RuleRepository ruleRepository;
    AccountRepository accountRepository;
    BulletinBoardMapper bulletinBoardMapper;

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
}
