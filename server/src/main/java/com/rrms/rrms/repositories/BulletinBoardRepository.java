package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rrms.rrms.models.BulletinBoard;
import org.springframework.data.repository.query.Param;

public interface BulletinBoardRepository extends JpaRepository<BulletinBoard, UUID> {

    // Truy vấn tìm kiếm các bulletin board theo địa chỉ
    @Query("SELECT b FROM BulletinBoard b WHERE :address IS NULL OR :address = '' OR LOWER(b.address) LIKE LOWER('%' || :address || '%')")
    List<BulletinBoard> findByAddress(@Param("address") String address);



    List<BulletinBoard> findByIsActive(Boolean isActive);

    // Hoặc nếu bạn muốn làm việc với Boolean: trạng thái true/false
    List<BulletinBoard> findByisActiveIsTrue(); // Trạng thái "đã kiểm duyệt"
    List<BulletinBoard> findByisActiveIsFalse(); // Trạng thái "chưa kiểm duyệt"
}
