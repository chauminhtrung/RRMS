package com.rrms.rrms.services;

import java.util.List;

import com.rrms.rrms.dto.request.SupportRequest;
import com.rrms.rrms.dto.response.SupportResponse;

public interface ISupportService {
    boolean insert(SupportRequest supportRequest);

    List<SupportResponse> listSupport();
}
