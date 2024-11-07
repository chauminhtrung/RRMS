package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        // Lấy Account dựa trên username
        Account account = accountRepository
                .findByUsername(bulletinBoardRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        // Lưu BulletinBoard trước và lấy lại đối tượng BulletinBoard đã được lưu (có ID)
        BulletinBoard bulletinBoard = bulletinBoardMapper.toBulletinBoard(bulletinBoardRequest);
        bulletinBoard.setAccount(account);
        bulletinBoard = bulletinBoardRepository.save(bulletinBoard); // Lưu BulletinBoard

        // Lưu các BulletinBoardImage sau khi BulletinBoard đã có ID hợp lệ
        for (BulletinBoardImage image : bulletinBoardRequest.getBulletinBoardImages()) {
            BulletinBoardImage bulletinBoardImage = new BulletinBoardImage();
            bulletinBoardImage.setBulletinBoard(bulletinBoard); // Gắn đúng đối tượng cha
            bulletinBoardImage.setImageLink(image.getImageLink());

            // Kiểm tra xem đối tượng đã được gắn vào session chưa
            if (bulletinBoardImage.getBulletinBoard() == null) {
                bulletinBoardImage.setBulletinBoard(bulletinBoard);
            }

            bulletinBoardImageRepository.save(bulletinBoardImage); // Lưu đối tượng con
        }

        // Lưu các BulletinBoardRule
        for (BulletinBoardRule bulletinRule : bulletinBoardRequest.getBulletinBoardRules()) {
            // Giả sử bạn đã có thông tin về Rule cần lưu, ví dụ từ bulletinRule
            Rule rule = bulletinRule.getRule(); // Nếu rule đã có thông tin từ request, lấy ra
            if (rule != null) {
                rule = ruleRepository.save(rule); // Lưu rule vào cơ sở dữ liệu (nếu cần thiết)
            } else {
                // Xử lý trường hợp nếu rule chưa có, bạn có thể tạo rule mới nếu cần
                rule = new Rule();
                // Cập nhật các thuộc tính của rule (nếu có)
                rule = ruleRepository.save(rule);
            }

            BulletinBoardRule bulletinBoardRule = new BulletinBoardRule();
            bulletinBoardRule.setBulletinBoard(bulletinBoard);
            bulletinBoardRule.setRule(rule); // Gán rule đã lưu vào bulletinBoardRule

            // Lưu BulletinBoardRule và đảm bảo nó được đồng bộ ngay lập tức
            bulletinBoardRuleRepository.save(bulletinBoardRule);
        }


        for (BulletinBoards_RentalAm rentalAm : bulletinBoardRequest.getBulletinBoards_RentalAm()) {
            // Kiểm tra xem rentalAmenities có tồn tại trong cơ sở dữ liệu không
            Optional<RentalAmenities> rentalAmenitiesOptional = rentalAmenitiesRepository.findByName(rentalAm.getRentalAmenities().getName());

            RentalAmenities rentalAmenities;
            if (rentalAmenitiesOptional.isPresent()) {
                // Nếu rentalAmenities tồn tại, sử dụng đối tượng đã có
                rentalAmenities = rentalAmenitiesOptional.get();
            } else {
                // Nếu rentalAmenities không tồn tại, tạo mới
                rentalAmenities = new RentalAmenities();
                rentalAmenities.setName(rentalAm.getRentalAmenities().getName()); // Cập nhật các thuộc tính khác nếu cần
                rentalAmenities = rentalAmenitiesRepository.save(rentalAmenities);  // Lưu RentalAmenities mới
            }

            // Tiến hành lưu BulletinBoards_RentalAm
            BulletinBoards_RentalAm bulletinBoards_RentalAm = new BulletinBoards_RentalAm();
            bulletinBoards_RentalAm.setBulletinBoard(bulletinBoard);
            bulletinBoards_RentalAm.setRentalAmenities(rentalAmenities);

            // Lưu BulletinBoards_RentalAm và đảm bảo nó được đồng bộ ngay lập tức
            bulletinBoards_RentalAmRepository.save(bulletinBoards_RentalAm);
        }

        // Trả về đối tượng BulletinBoardResponse đã được chuyển đổi
        return bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard);
    }


}
