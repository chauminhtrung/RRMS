package com.rrms.rrms.repositories;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Contract;

public interface ContractRepository extends JpaRepository<Contract, UUID> {

    List<Contract> findByRoom_Motel_MotelId(UUID MotelId);

    Contract findByRoom_RoomId(UUID MotelId);

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
}
