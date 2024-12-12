package com.rrms.rrms.configs;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.Arrays;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.rrms.rrms.dto.request.IntrospecTokenRequest;
import com.rrms.rrms.dto.response.IntrospecTokenResponse;
import com.rrms.rrms.services.servicesImp.AuthorityService;

@ExtendWith(MockitoExtension.class)
public class CustomJwtDecoderTest {

    @Mock
    private AuthorityService authorityService;

    @InjectMocks
    private CustomJwtDecoder customJwtDecoder;

    private final String token =
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwicGVybWlzc2lvbnMiOlsiQVBQUk9WRURfUE9TVCIsIlVQREFURV9IT1NUX0FDQ09VTlQiLCJDUkVBVEVfSE9TVF9BQ0NPVU5UIiwiU0VBUkNIX0hPU1RfQUNDT1VOVCIsIkRFTEVURV9IT1NUX0FDQ09VTlQiXSwicm9sZXMiOlsiQURNSU4iXSwiaXNzIjoiYWRtaW4iLCJleHAiOjE3MzI4NTYyMTYsImlhdCI6MTczMjg1MjYxNiwianRpIjoiNzlkNjlmZDItZTFiMi00YjFkLTlkOWItM2ExZDE4YjhkNjRjIn0.xXRmPr83pulId2VCP5sCFaIsZ0rL5JL18IW1dFJ8Q-B58zjkVUFl4vtOeYuH52ue4TUg892Enfc4l44zD4TA9A";

    private final String signerKey = "HZzOlpxoIUPSCEJUhay8fXyMsJe7qM0v/RQYAzZU65I1WwIV+iep9A0wHNc0TgIJ";

    @BeforeEach
    public void setUp() {
        customJwtDecoder.signerKey = signerKey;
    }

    @Test
    public void testDecodeValidToken() throws Exception {
        // Generate a valid JWT for the test
        Date expirationTime = new Date(System.currentTimeMillis() + 3600 * 1000);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject("1234567890")
                .issueTime(new Date())
                .expirationTime(expirationTime)
                .build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS512), claimsSet);
        JWSSigner signer = new MACSigner(signerKey.getBytes());
        signedJWT.sign(signer);

        String jwtToken = signedJWT.serialize(); // Use this token for the test

        // Arrange: Mock introspect to return a valid response
        IntrospecTokenResponse validResponse = new IntrospecTokenResponse(
                true,
                "Token is valid",
                "1234567890",
                expirationTime,
                "issuer-example",
                new Date(),
                Arrays.asList("ROLE_USER"),
                Arrays.asList("READ_PRIVILEGE", "WRITE_PRIVILEGE"));
        IntrospecTokenRequest validRequest = IntrospecTokenRequest.builder()
                .token(jwtToken) // Use the generated JWT
                .build();
        when(authorityService.introspect(validRequest)).thenReturn(validResponse);

        // Act: Call the decode method
        Jwt result = customJwtDecoder.decode(jwtToken); // Use the generated JWT

        // Assert: Check the returned result from decode
        assertNotNull(result);
        verify(authorityService).introspect(validRequest);
    }

    @Test
    public void testDecodeInvalidToken() throws Exception {
        // Arrange: Mô phỏng introspect trả về phản hồi không hợp lệ
        IntrospecTokenResponse invalidResponse =
                new IntrospecTokenResponse(false, "Token invalid", null, null, null, null, null, null);
        IntrospecTokenRequest invalidRequest =
                IntrospecTokenRequest.builder().token(token).build();
        when(authorityService.introspect(invalidRequest)).thenReturn(invalidResponse);

        // Act & Assert: Kiểm tra rằng một JwtException được ném ra khi token không hợp lệ
        JwtException exception = assertThrows(JwtException.class, () -> customJwtDecoder.decode(token));
        assertEquals("Token invalid", exception.getMessage());
    }

    @Test
    public void testDecodeWithExceptionFromIntrospect() throws Exception {
        // Arrange: Mô phỏng ngoại lệ từ introspect
        IntrospecTokenRequest request =
                IntrospecTokenRequest.builder().token(token).build();
        when(authorityService.introspect(request)).thenThrow(new JOSEException("Error during introspection"));

        // Act & Assert: Kiểm tra ngoại lệ JwtException được ném ra khi introspect thất bại
        JwtException exception = assertThrows(JwtException.class, () -> customJwtDecoder.decode(token));
        assertEquals("Error during introspection", exception.getMessage());
    }

    @Test
    public void testDecodeWithParseException() throws Exception {
        // Arrange: Mô phỏng ngoại lệ ParseException từ introspect
        IntrospecTokenRequest request =
                IntrospecTokenRequest.builder().token(token).build();
        when(authorityService.introspect(request)).thenThrow(new ParseException("Error parsing", 0));

        // Act & Assert: Kiểm tra ngoại lệ JwtException được ném ra khi có lỗi ParseException
        JwtException exception = assertThrows(JwtException.class, () -> customJwtDecoder.decode(token));
        assertEquals("Error parsing", exception.getMessage());
    }
}
