package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.SupportRequest;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Support;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.SupportRepository;
import com.rrms.rrms.services.ISupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class SupportService implements ISupportService {
    @Autowired
    private SupportRepository supportRepository;
    @Autowired
    private AccountRepository accountRepository;


    Support toSupport(SupportRequest request) {
        Account account = accountRepository.findByUsername(request.getAccount().getUsername()).orElse(null);
        if (account != null) {
            Support support = new Support();
            support.setAccount(account);
            support.setDateOfStay(request.getDateOfStay());
            support.setCreateDate(new Date(System.currentTimeMillis()));
            support.setPriceFirst(request.getPriceFirst());
            support.setPriceEnd(request.getPriceEnd());
            return support;
        }
        return null;
    }

    @Override
    public boolean insert(SupportRequest supportRequest) {
        Support support = toSupport(supportRequest);
        Support status = supportRepository.save(support);
        if (status != null) {
            return true;
        } else {
            return false;
        }
    }
}
