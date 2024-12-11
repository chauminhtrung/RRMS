package com.rrms.rrms.configs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

public class VNPayConfigTest {

    private final VNPayConfig vnPayConfig = new VNPayConfig(); // Instantiate your config class

    @Test
    void testMd5() {
        String input = "Hello World";
        String expected = "b10a8db164e0754105b7a99be72e3fe5"; // Pre-calculated MD5 hash
        String actual = VNPayConfig.md5(input);
        assertEquals(expected, actual);
    }

    @Test
    void testSha256() {
        String input = "Hello World";
        String expected =
                "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"; // Pre-calculated SHA-256 hash
        String actual = VNPayConfig.Sha256(input);
        assertEquals(expected, actual);
    }

    @Test
    void testHashAllFields() {
        // Set a dummy secret key for testing.  Don't use a real secret key in tests!
        vnPayConfig.secretKey = "testSecretKey";

        Map<String, String> fields = new HashMap<>();
        fields.put("vnp_Amount", "10000");
        fields.put("vnp_Command", "pay");
        fields.put("vnp_CreateDate", "20231026173030");
        fields.put("vnp_CurrCode", "VND");
        fields.put("vnp_IpAddr", "127.0.0.1");
        fields.put("vnp_Locale", "vn");
        fields.put("vnp_OrderInfo", "Test order");
        fields.put("vnp_OrderType", "billpayment");
        fields.put("vnp_ReturnUrl", "http://localhost:8080/payment/vnpay-callback");
        fields.put("vnp_TmnCode", "XKE8UEHS");
        fields.put("vnp_TxnRef", "1698297830428");
        fields.put("vnp_Version", "2.1.0");

        // The expected hash should be pre-calculated using your test secret key and the same input fields.
        String expectedHash =
                "8e4e4c0f8bd1b72690fadb0effd16f6d4b269972c1432324383798318409c5355e5ba8b9fc50759676826c4e56ae9aacc4918edab6d9220be0f80df6c86d3f55"; // Example expected hash

        String actualHash = vnPayConfig.hashAllFields(fields);

        assertEquals(expectedHash, actualHash);
    }

    @Test
    void testGetIpAddress() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRemoteAddr("192.168.1.1");

        String ipAddress = VNPayConfig.getIpAddress(request);
        assertEquals("192.168.1.1", ipAddress);

        request.addHeader("X-FORWARDED-FOR", "10.0.0.1");
        ipAddress = VNPayConfig.getIpAddress(request);
        assertEquals("10.0.0.1", ipAddress);
    }

    @Test
    void testGetRandomNumber() {
        String randomNumber = VNPayConfig.getRandomNumber(10);
        assertNotNull(randomNumber);
        assertEquals(10, randomNumber.length());
    }
}
