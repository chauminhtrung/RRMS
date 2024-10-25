package com.rrms.rrms.services;

import java.text.ParseException;

import com.nimbusds.jose.JOSEException;
import com.rrms.rrms.dto.request.IntrospecTokenRequest;
import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.dto.request.LogoutRequest;
import com.rrms.rrms.dto.response.IntrospecTokenResponse;
import com.rrms.rrms.dto.response.LoginResponse;
import com.rrms.rrms.models.Auth;
import java.text.ParseException;

public interface IAuthorityService {
  LoginResponse loginResponse(LoginRequest request);

  IntrospecTokenResponse introspect(IntrospecTokenRequest request) throws ParseException, JOSEException;

  void logout(LogoutRequest request) throws ParseException, JOSEException;

  Auth save(Auth auth);
}
