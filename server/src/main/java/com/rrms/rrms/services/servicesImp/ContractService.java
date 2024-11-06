package com.rrms.rrms.services.servicesImp;

import java.math.BigDecimal;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.services.IContractService;

@Service
public class ContractService implements IContractService {

    @Autowired
    private EntityManager entityManager;

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

    public int getTotalExpiredContracts(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalExpiredContracts");
        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        query.setParameter(1, username);
        return (int) query.getSingleResult();
    }

    public int getTotalExpiringContracts(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalExpiringContractsProcedure");
        query.registerStoredProcedureParameter(1, String.class, jakarta.persistence.ParameterMode.IN);
        query.setParameter(1, username);
        return (int) query.getSingleResult();
    }
}
