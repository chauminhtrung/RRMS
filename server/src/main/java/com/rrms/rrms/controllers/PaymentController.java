package com.rrms.rrms.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.rrms.rrms.configs.CustomerEnvironment;
import com.rrms.rrms.configs.VNPayConfig;
import com.rrms.rrms.dto.PaymentRestDTO;
import com.rrms.rrms.dto.request.StripeRequest;
import com.rrms.rrms.dto.response.PaymentResponse;
import com.rrms.rrms.dto.response.StripeResponse;
import com.rrms.rrms.enums.RequestType;
import com.rrms.rrms.repositories.InvoiceRepository;
import com.rrms.rrms.repositories.PaymentRepository;
import com.rrms.rrms.services.IPayment;
import com.rrms.rrms.services.servicesImp.CreateOrderMoMo;
import com.rrms.rrms.utils.LogUtils;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Value("${stripe.api.publicKey}")
    private String publicKey;

    @Value("${vnpay.api.secretKey}")
    public String secretKey;

    IPayment paymentService;

    @Autowired
    private CustomerEnvironment environment;

    @Autowired
    private CreateOrderMoMo createOrderMoMo;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // Paypal payment
    // sb-fo7f331992187@personal.example.com
    // r&o}V0Z>
    @PostMapping("/payment-paypal")
    public Map<String, String> payment(
            @RequestParam("totalPrice") double totalPrice, @RequestParam("userName") String userName) {
        Map<String, String> response = new HashMap<>();
        try {
            String cancelUrl = "http://localhost:8080/payment/paypal/cancel";
            String successUrl = "http://localhost:8080/payment/paypal/success";
            Payment payment = paymentService.createPayment(
                    totalPrice, "USD", "PAYPAL", "sale", userName + " Thanh toán", cancelUrl, successUrl);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    response.put("redirectUrl", links.getHref());
                    return response;
                }
            }
        } catch (PayPalRESTException e) {
            throw new RuntimeException(e);
        }
        response.put("redirectUrl", "payment/paypal/error");
        return response;
    }

    @GetMapping("/paypal/cancel")
    @ResponseBody
    public String cancel() {
        return "cancel";
    }

    @GetMapping("/paypal/error")
    @ResponseBody
    @PermitAll
    public String error() {
        return "error";
    }

    @GetMapping("/paypal/success")
    @ResponseBody
    @PermitAll
    public String success() {
        return "success";
    }

    // vnpay
    // 9704198526191432198
    // NGUYEN VAN A
    // 07/15
    //	123456
    @PostMapping("/create_payment")
    @PermitAll
    public ResponseEntity<?> getPay(@RequestBody Map<String, Object> requestData, HttpServletRequest request)
            throws UnsupportedEncodingException {
        HttpSession session = request.getSession();
        String username = (String) requestData.get("userName");
        session.setAttribute("userName", username);

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        double totalPrice = Double.valueOf(requestData.get("totalPrice").toString());
        int amount = (int) (totalPrice * 100);
        String bankCode = "NCB";

        String vnp_TxnRef = VNPayConfig.getRandomNumber(6);
        String vnp_IpAddr = "127.0.0.1";

        // cấu hình của vnpay
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        // xử lý thời gian ngày giờ thanh toán
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15); // Payment expires after 15 minutes
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Tạo chuỗi dữ liệu và bảo mật của thanh toán
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName)
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()))
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash; // mã hóa

        // Tạo đường dẫn cho thanh toán
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;

        // Trả kết quả về cho client
        PaymentRestDTO paymentRestDTO = new PaymentRestDTO();
        paymentRestDTO.setURL(paymentUrl);
        return ResponseEntity.status(HttpStatus.OK).body(paymentRestDTO);
    }

    @GetMapping("/vnpay-callback")
    public ResponseEntity<Void> paymentCallback(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        String orderID = request.getParameter("vnp_TxnRef");
        String amount = request.getParameter("vnp_Amount");
        String status = request.getParameter("vnp_ResponseCode");

        if ("00".equals(status)) {
            return ResponseEntity.status(302)
                    .header("Location", "/payment/paymentSuccess")
                    .build();
        } else {
            return ResponseEntity.status(302)
                    .header("Location", "/payment/paymentFailed")
                    .build();
        }
    }

    @RequestMapping("/paymentSuccess")
    @PermitAll
    public String paymentSuccess() {
        return "paymentVNPaySuccess";
    }

    @GetMapping("/paymentFailed")
    @PermitAll
    public String paymentFailed() {
        return "paymentVNPayFailed";
    }

    @PostMapping("/payMoMo")
    public PaymentResponse paymentMoMo(@RequestBody Map<String, Object> requestData, HttpServletRequest request)
            throws Exception {
        HttpSession session = request.getSession();
        String username = (String) requestData.get("username");
        session.setAttribute("username", username);
        LogUtils.init();
        // Khởi tạo các tham số để giao dịch
        String requestId = String.valueOf(System.currentTimeMillis());
        String orderId = VNPayConfig.getRandomNumber(6);
        Long transId = 2L;
        double totalPrice = Double.valueOf(requestData.get("totalPrice").toString());
        long amount = (long) (totalPrice * 100);
        String partnerClientId = "partnerClientId";
        String orderInfo = "Pay With MoMo";
        String returnUrl = "http://localhost:8080/payment/paymentMoMoSuccess";
        String notifyURL = "http://google.com.vn";

        // Chọn môi trường và thanh toán bằng momo
        CustomerEnvironment environment = CustomerEnvironment.selectEnv("dev");
        PaymentResponse captureWalletMoMoResponse = createOrderMoMo.process(
                environment,
                orderId,
                requestId,
                Long.toString(amount / 100),
                orderInfo,
                returnUrl,
                notifyURL,
                "",
                RequestType.PAY_WITH_ATM,
                Boolean.TRUE);
        return captureWalletMoMoResponse;
    }

    @RequestMapping("/paymentMoMoSuccess")
    @PermitAll
    public String paymentMoMoSuccess() {
        return "paymentMomoSuccess";
    }

    @PermitAll
    @PostMapping("/payment-stripe")
    @ResponseBody
    public ResponseEntity<StripeResponse> createPaymentIntent(@RequestBody @Valid StripeRequest request)
            throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount() * 100L) // Chuyển đổi USD sang cent
                .putMetadata("productName", request.getProductName())
                .setCurrency("usd")
                .setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .build())
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        // Trả về clientSecret cho frontend
        StripeResponse responseDto = new StripeResponse(intent.getId(), intent.getClientSecret());
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list_payment")
    public ResponseEntity<List<com.rrms.rrms.models.Payment>> getAllPayments() {
        List<com.rrms.rrms.models.Payment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }
}
