package com.rrms.rrms.services;

import java.math.BigDecimal;

import com.rrms.rrms.models.Account;

public interface IContractService {
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord);

    public BigDecimal getTotalActiveContractsDepositByLandlord(Account usernameLandlord);

    //    public long getExpiredContracts(Account usernameLandlord );
    //
    //    public long getExpiringContracts(Account usernameLandlord);
}
