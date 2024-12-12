package com.rrms.rrms.services.servicesImp;

import org.springframework.stereotype.Service;

import com.rrms.rrms.configs.CustomerEnvironment;
import com.rrms.rrms.constants.Parameter;
import com.rrms.rrms.dto.request.PaymentRequest;
import com.rrms.rrms.dto.response.HttpResponse;
import com.rrms.rrms.dto.response.PaymentResponse;
import com.rrms.rrms.enums.Language;
import com.rrms.rrms.enums.RequestType;
import com.rrms.rrms.exceptions.MoMoException;
import com.rrms.rrms.services.AbstractProcess;
import com.rrms.rrms.utils.Encoder;
import com.rrms.rrms.utils.LogUtils;

@Service
public class CreateOrderMoMo extends AbstractProcess<PaymentRequest, PaymentResponse> {

    public CreateOrderMoMo(CustomerEnvironment environment) {
        super(environment);
    }

    public static PaymentResponse process(
            CustomerEnvironment env,
            String orderId,
            String requestId,
            String amount,
            String orderInfo,
            String returnURL,
            String notifyURL,
            String extraData,
            RequestType requestType,
            Boolean autoCapture)
            throws Exception {
        try {
            CreateOrderMoMo m2Processor = new CreateOrderMoMo(env);

            PaymentRequest request = m2Processor.createPaymentCreationRequest(
                    orderId, requestId, amount, orderInfo, returnURL, notifyURL, extraData, requestType, autoCapture);
            PaymentResponse captureMoMoResponse = m2Processor.execute(request);

            return captureMoMoResponse;
        } catch (Exception exception) {
            LogUtils.error("[CreateOrderMoMoProcess] " + exception);
        }
        return null;
    }

    @Override
    public PaymentResponse execute(PaymentRequest request) throws RuntimeException {
        try {

            String payload = getGson().toJson(request, PaymentRequest.class);

            HttpResponse response =
                    execute.sendToMoMo(environment.getMomoEndpoint().getCreateUrl(), payload);

            if (response.getStatus() != 200) {
                throw new MoMoException("[PaymentResponse] [" + request.getOrderId() + "] -> Error API");
            }

            //			System.out.println("uweryei7rye8wyreow8: " + response.getData());

            PaymentResponse captureMoMoResponse = getGson().fromJson(response.getData(), PaymentResponse.class);
            String responserawData = Parameter.REQUEST_ID + "=" + captureMoMoResponse.getRequestId() + "&"
                    + Parameter.ORDER_ID + "=" + captureMoMoResponse.getOrderId() + "&" + Parameter.MESSAGE + "="
                    + captureMoMoResponse.getMessage() + "&" + Parameter.PAY_URL + "=" + captureMoMoResponse.getPayUrl()
                    + "&" + Parameter.RESULT_CODE + "=" + captureMoMoResponse.getResultCode();

            LogUtils.info("[PaymentMoMoResponse] rawData: " + responserawData);

            return captureMoMoResponse;

        } catch (Exception exception) {
            LogUtils.error("[PaymentMoMoResponse] " + exception);
            throw new IllegalArgumentException("Invalid params capture MoMo Request");
        }
    }

    public PaymentRequest createPaymentCreationRequest(
            String orderId,
            String requestId,
            String amount,
            String orderInfo,
            String returnUrl,
            String notifyUrl,
            String extraData,
            RequestType requestType,
            Boolean autoCapture) {

        try {
            String requestRawData = new StringBuilder()
                    .append(Parameter.ACCESS_KEY)
                    .append("=")
                    .append(partnerInfo.getAccessKey())
                    .append("&")
                    .append(Parameter.AMOUNT)
                    .append("=")
                    .append(amount)
                    .append("&")
                    .append(Parameter.EXTRA_DATA)
                    .append("=")
                    .append(extraData)
                    .append("&")
                    .append(Parameter.IPN_URL)
                    .append("=")
                    .append(notifyUrl)
                    .append("&")
                    .append(Parameter.ORDER_ID)
                    .append("=")
                    .append(orderId)
                    .append("&")
                    .append(Parameter.ORDER_INFO)
                    .append("=")
                    .append(orderInfo)
                    .append("&")
                    .append(Parameter.PARTNER_CODE)
                    .append("=")
                    .append(partnerInfo.getPartnerCode())
                    .append("&")
                    .append(Parameter.REDIRECT_URL)
                    .append("=")
                    .append(returnUrl)
                    .append("&")
                    .append(Parameter.REQUEST_ID)
                    .append("=")
                    .append(requestId)
                    .append("&")
                    .append(Parameter.REQUEST_TYPE)
                    .append("=")
                    .append(requestType.getRequestType())
                    .toString();

            String signRequest = Encoder.signHmacSHA256(requestRawData, partnerInfo.getSecretKey());
            LogUtils.debug("[PaymentRequest] rawData: " + requestRawData + ", [Signature] -> " + signRequest);

            return new PaymentRequest(
                    partnerInfo.getPartnerCode(),
                    orderId,
                    requestId,
                    Language.EN,
                    orderInfo,
                    Long.valueOf(amount),
                    "test MoMo",
                    null,
                    requestType,
                    returnUrl,
                    notifyUrl,
                    "test store ID",
                    extraData,
                    null,
                    autoCapture,
                    null,
                    signRequest);
        } catch (Exception e) {
            LogUtils.error("[PaymentRequest] " + e);
        }

        return null;
    }
}
