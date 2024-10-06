package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.models.Auth;

public interface IAuthorityService {

    public Auth save(Auth authority);

    public List<Auth> findAll();

    public void deleteById(int id);
}
