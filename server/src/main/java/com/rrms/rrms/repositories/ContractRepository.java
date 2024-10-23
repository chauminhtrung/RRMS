package com.rrms.rrms.repositories;

import java.util.UUID;

import com.rrms.rrms.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Contract;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepository extends JpaRepository<Contract, UUID> {
    // tinh tong contract da dc active
    @Query("SELECT COUNT(c) FROM Contract c WHERE c.landlord = :usernameLandlord AND c.status = 'ACTIVE'")
    Integer countActiveContractsByLandlord(@Param("usernameLandlord") Account usernameLandlord);

    //tinh tong tien contact da dc active
    @Query("SELECT SUM(c.deposit) FROM Contract c WHERE c.landlord = :usernameLandlord AND c.status = 'ACTIVE'")
    Double sumActiveContractDepositsByLandlord(@Param("usernameLandlord") Account usernameLandlord);
}
