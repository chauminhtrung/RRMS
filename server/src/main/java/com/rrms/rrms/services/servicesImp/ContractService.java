package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.services.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService implements IContractService {
    @Autowired
    private ContractRepository contractRepository;

    @Override
    public Integer getTotalActiveContractsByLandlord(Account usernameLandlord) {
        return contractRepository.countActiveContractsByLandlord(usernameLandlord);
    }

    @Override
    public Double getTotalActiveContractsDepositByLandlord(Account usernameLandlord) {
        return contractRepository.sumActiveContractDepositsByLandlord(usernameLandlord);
    }
}
