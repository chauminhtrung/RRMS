package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.TemporaryR_contractRequest;
import com.rrms.rrms.dto.response.TemporaryR_contractRespone;

public interface ITemporaryR_contract {

    TemporaryR_contractRespone insert(TemporaryR_contractRequest temporaryR_contract);

    List<TemporaryR_contractRespone> findById(UUID id);

    List<TemporaryR_contractRespone> findTRCByAccount_Username(String username);

    List<TemporaryR_contractRespone> findAll();

    TemporaryR_contractRespone update(UUID id, TemporaryR_contractRequest temporaryR_contract);

    void delete(UUID id);
}
