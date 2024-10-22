package com.rrms.rrms.services;

import com.nimbusds.jose.JOSEException;
import com.rrms.rrms.dto.request.IntrospecTokenRequest;
import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.dto.response.IntrospecTokenResponse;
import com.rrms.rrms.dto.response.LoginResponse;
import java.text.ParseException;

public interface IAuthorityService {
  LoginResponse loginResponse(LoginRequest request);

  IntrospecTokenResponse introspect(IntrospecTokenRequest request) throws ParseException, JOSEException;
    //    public Auth save(Auth authority);
    //
    //    public List<Auth> findAll();
    //
    //    public void deleteById(int id);
}
