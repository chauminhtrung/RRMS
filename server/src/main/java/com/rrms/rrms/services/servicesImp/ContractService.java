package com.rrms.rrms.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.services.IContractService;

import java.math.BigDecimal;

@Service
public class ContractService implements IContractService {
    @Autowired
    private ContractRepository contractRepository;

    @Override
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord) {
        return contractRepository.countActiveContractsByLandlord(usernameLandlord);
    }

    @Override
    public BigDecimal getTotalActiveContractsDepositByLandlord(Account usernameLandlord) {
        return contractRepository.sumActiveContractDepositsByLandlord(usernameLandlord);
    }

    @Override
    public long getExpiredContracts(Account usernameLandlord) {
        return contractRepository.countExpiredContracts(usernameLandlord);
    }

    @Override
    public long getExpiringContracts(Account usernameLandlord) {
        return contractRepository.countExpiringContracts(usernameLandlord);
    }
}
