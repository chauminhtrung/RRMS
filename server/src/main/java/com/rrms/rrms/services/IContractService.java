package com.rrms.rrms.services;

import com.rrms.rrms.models.Account;

import java.math.BigDecimal;

public interface IContractService {
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord);

    public BigDecimal getTotalActiveContractsDepositByLandlord(Account usernameLandlord);

    public long getExpiredContracts(Account usernameLandlord);

    public long getExpiringContracts(Account usernameLandlord);
}
