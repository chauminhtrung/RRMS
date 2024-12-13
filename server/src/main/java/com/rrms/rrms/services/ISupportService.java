package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.SupportRequest;
import com.rrms.rrms.dto.response.SupportResponse;

import java.util.List;

public interface ISupportService {
    boolean insert(SupportRequest supportRequest);
    List<SupportResponse> listSupport();
}
