package com.rrms.rrms.repositories;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.enums.ContractStatus;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Contract;

public interface ContractRepository extends JpaRepository<Contract, UUID> {

    List<Contract> findByRoom_Motel_MotelId(UUID MotelId);

    Contract findByRoom_RoomId(UUID MotelId);

    @Transactional
    @Modifying
    @Query(
            "UPDATE Contract c SET c.status = :newStatus, c.reportcloseContract = :reportCloseDate WHERE c.room.roomId = :roomId")
    int updateContractStatusByRoomId(
            @Param("roomId") UUID roomId,
            @Param("newStatus") ContractStatus newStatus,
            @Param("reportCloseDate") Date reportCloseDate);

    @Transactional
    @Modifying
    @Query(
            "UPDATE Contract c SET c.deposit = :deposit, c.price = :price, c.debt = :debt WHERE c.contractId = :contractId")
    int updateContractDetailsByContractId(
            @Param("contractId") UUID contractId,
            @Param("deposit") Double deposit,
            @Param("price") Double price,
            @Param("debt") Double debt);

    @Transactional
    @Modifying
    @Query("UPDATE Contract c " + "SET c.status = :newStatus "
            + "WHERE c.closeContract <= :thresholdDate AND c.status = 'ACTIVE'")
    // So sánh với ngày
    int updateStatusForContractsBasedOnDaysDifference(
            @Param("newStatus") ContractStatus newStatus, @Param("thresholdDate") Date thresholdDate);

    @Transactional
    @Modifying
    @Query("UPDATE Contract c " + "SET c.status = :newStatus "
            + "WHERE c.closeContract >= :thresholdDate AND c.status = 'IATExpire'")
    int updateStatusForContractsBasedOnDaysDifference2(
            @Param("newStatus") ContractStatus newStatus, @Param("thresholdDate") Date thresholdDate);

    @Transactional
    @Modifying
    @Query("UPDATE Contract c SET c.closeContract = :newCloseContract WHERE c.contractId = :contractId")
    int updateCloseContractByContractId(
            @Param("newCloseContract") Date newCloseContract, @Param("contractId") UUID contractId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Contract c WHERE c.room.roomId = :roomId")
    void deleteByRoomId(@Param("roomId") UUID roomId);

    // tinh tong contract da dc active
    @Query("SELECT COUNT(c) FROM Contract c WHERE c.account = :usernameLandlord AND c.status = 'ACTIVE'")
    Integer countActiveContractsByLandlord(@Param("usernameLandlord") Account usernameLandlord);

    // tinh tong tien contact da dc active
    @Query("SELECT SUM(c.deposit) FROM Contract c WHERE c.account = :usernameLandlord AND c.status = 'ACTIVE'")
    BigDecimal sumActiveContractDepositsByLandlord(@Param("usernameLandlord") Account usernameLandlord);

    // tinh tổng hợp đồng đã hết hạn
    //    @Query("SELECT COUNT(c) FROM Contract c " +
    //            "WHERE DATE_ADD(c.firstTime, INTERVAL (c.leaseTerm MONTH)) <= DATE_SUB(CURRENT_DATE, INTERVAL (1
    // MONTH)) " +
    //            "AND c.landlord = :usernameLandlord")
    //    long countExpiredContracts(@Param("usernameLandlord") Account usernameLandlord);

    //    //tính tổng hợp đồng sắp hết hạn
    //    @Query("SELECT COUNT(c) FROM Contract c " +
    //            "WHERE DATE_ADD(c.firstTime, INTERVAL (c.leaseTerm MONTH)) <= CURDATE() + INTERVAL (30 DAY) " +
    //            "AND DATE_ADD(c.firstTime, INTERVAL (c.leaseTerm MONTH)) >= CURDATE() " +
    //            "AND c.landlord = :usernameLandlord")
    //    long countExpiringContracts(@Param("usernameLandlord") Account usernameLandlord);

    List<Contract> findByRoomRoomId(UUID roomId);
}
