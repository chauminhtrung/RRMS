package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.SupportRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.SupportResponse;
import com.rrms.rrms.mapper.AccountMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Support;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.SupportRepository;
import com.rrms.rrms.services.ISupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupportService implements ISupportService {
    @Autowired
    private SupportRepository supportRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountMapper accountMapper;

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

    SupportResponse toSupportResponse(Support support) {
        SupportResponse response = new SupportResponse();
        response.setSupportId(support.getSupportId());
        response.setAccount(accountMapper.toAccountResponse(support.getAccount()));
        response.setDateOfStay(support.getDateOfStay());
        response.setCreateDate(support.getCreateDate());
        response.setPriceFirst(support.getPriceFirst());
        response.setPriceEnd(support.getPriceEnd());
        return response;
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

    @Override
    public List<SupportResponse> listSupport() {
        List<Support> supports = supportRepository.findAll();
        return supports.stream().map(this::toSupportResponse).collect(Collectors.toList());
    }
}
