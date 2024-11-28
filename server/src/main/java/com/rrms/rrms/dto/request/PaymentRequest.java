package com.rrms.rrms.dto.request;

import com.rrms.rrms.enums.Language;
import com.rrms.rrms.enums.RequestType;

import lombok.Data;

@Data
public class PaymentRequest extends Request {
    private String orderInfo;
    private long amount;
    private String partnerName;
    private String subPartnerCode;
    private RequestType requestType;
    private String redirectUrl;
    private String ipnUrl;
    private String storeId;
    private String extraData;
    private String partnerClientId;
    private Boolean autoCapture = true;
    private Long orderGroupId;
    private String signature;

    public PaymentRequest(
            String partnerCode,
            String orderId,
            String requestId,
            Language lang,
            String orderInfo,
            long amount,
            String partnerName,
            String subPartnerCode,
            RequestType requestType,
            String redirectUrl,
            String ipnUrl,
            String storeId,
            String extraData,
            String partnerClientId,
            Boolean autoCapture,
            Long orderGroupId,
            String signature) {
        super(partnerCode, orderId, requestId, lang);
        this.orderInfo = orderInfo;
        this.amount = amount;
        this.partnerName = partnerName;
        this.subPartnerCode = subPartnerCode;
        this.requestType = requestType;
        this.redirectUrl = redirectUrl;
        this.ipnUrl = ipnUrl;
        this.storeId = storeId;
        this.extraData = extraData;
        this.partnerClientId = partnerClientId;
        this.autoCapture = autoCapture;
        this.orderGroupId = orderGroupId;
        this.signature = signature;
    }
}
