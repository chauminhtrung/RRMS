package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.models.Auth;

public interface AuthorityService {
    public void save(Auth authority);

    public Auth saveA(Auth authority);

    public List<Auth> findAll();

    public void deleteById(int id);
}
