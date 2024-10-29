package com.rrms.rrms.services;

import com.rrms.rrms.models.Account;

public interface IContractService {
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord);

    public Double getTotalActiveContractsDepositByLandlord(Account usernameLandlord);
}
