package com.rrms.rrms.servicesImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.models.Auth;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.services.AuthorityService;

@Service
public class AuthorityServiceImp implements AuthorityService {

    @Autowired
    AuthRepository authRepository;

    @Override
    public void save(Auth authority) {
        authRepository.save(authority);
    }

    @Override
    public Auth saveA(Auth authority) {
        return authRepository.save(authority);
    }

    @Override
    public List<Auth> findAll() {
        return authRepository.findAll();
    }

    @Override
    public void deleteById(int id) {}
}
