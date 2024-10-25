package com.rrms.rrms.services.servicesImp;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.rrms.rrms.dto.request.IntrospecTokenRequest;
import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.dto.response.IntrospecTokenResponse;
import com.rrms.rrms.dto.response.LoginResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.services.IAuthorityService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class AuthorityService implements IAuthorityService {

    @Autowired
    AuthRepository authRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountService accountService;

    @Value("${jwt.signer-key}")
    private String signerKey;

    public IntrospecTokenResponse introspect(IntrospecTokenRequest request) throws ParseException, JOSEException {
        try {
            // Lấy token từ request
            String token = request.getToken();

            // Kiểm tra token có rỗng hay không
            if (StringUtils.isEmpty(token)) {
                return IntrospecTokenResponse.builder()
                        .valid(false)
                        .message("Token is empty")
                        .build();
            }

            // Parse chuỗi JWT thành đối tượng SignedJWT để có thể xử lý
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Tạo đối tượng verifier với secret key để verify chữ ký của token
            JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

            // Kiểm tra tính hợp lệ của chữ ký token
            boolean isSignatureValid = signedJWT.verify(verifier);

            // Nếu chữ ký không hợp lệ, trả về response với valid = false
            if (!isSignatureValid) {
                return IntrospecTokenResponse.builder()
                        .valid(false)
                        .message("Invalid token signature")
                        .build();
            }

            // Lấy ra phần claims (payload) của JWT để đọc các thông tin
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();

            // Lấy thời gian hết hạn từ claims
            Date expirationTime = claimsSet.getExpirationTime();

            // Kiểm tra token đã hết hạn chưa
            // Nếu expirationTime null hoặc đã qua thời điểm hiện tại thì token hết hạn
            if (expirationTime == null || expirationTime.before(new Date())) {
                return IntrospecTokenResponse.builder()
                        .valid(false)
                        .message("Token has expired")
                        .build();
            }

            // Nếu token hợp lệ (chữ ký đúng và chưa hết hạn)
            // Trả về response với đầy đủ thông tin từ token
            return IntrospecTokenResponse.builder()
                    .valid(true) // Token hợp lệ
                    .message("Token is valid") // Message thông báo
                    .subject(claimsSet.getSubject()) // Subject của token (thường là username/phone)
                    .expirationTime(expirationTime) // Thời gian hết hạn
                    .issuer(claimsSet.getIssuer()) // Issuer (người phát hành token)
                    .issuedAt(claimsSet.getIssueTime()) // Thời gian phát hành token
                    .build();

        } catch (Exception e) {
            // Log lại lỗi nếu có exception xảy ra trong quá trình xử lý token
            log.error("Error introspecting token", e);

            // Trả về response với thông báo lỗi cụ thể
            return IntrospecTokenResponse.builder()
                    .valid(false)
                    .message("Error processing token: " + e.getMessage())
                    .build();
        }
    }

    public LoginResponse loginResponse(LoginRequest request) {
        // Lấy tài khoản từ AccountService dựa trên số điện thoại và mật khẩu
        // Nếu không tìm thấy hoặc mật khẩu sai, ném ngoại lệ AUTHENTICATED
        Account account = accountService
                .login(request.getPhone(), request.getPassword())
                .orElseThrow(() -> new AppException(ErrorCode.AUTHENTICATED));

        // Tạo token JWT cho tài khoản sau khi đăng nhập thành công
        var token = generateToken(account.getPhone());

        // Xây dựng đối tượng LoginResponse với các thông tin cần thiết
        return LoginResponse.builder()
                .token(token) // Token JWT
                .authenticated(true) // Trạng thái xác thực thành công
                .username(account.getUsername()) // Tên người dùng
                .fullname(account.getFullname()) // Họ và tên đầy đủ
                .email(account.getEmail()) // Địa chỉ email
                .avatar(account.getAvatar()) // Ảnh đại diện (avatar)
                .birthday(account.getBirthday()) // Ngày sinh của người dùng
                .gender(account.getGender()) // Giới tính
                .cccd(account.getCccd()) // CCCD (Chứng minh nhân dân)
                .build(); // Hoàn thành việc xây dựng LoginResponse
    }

    private String generateToken(String phone) {
        // Tạo tiêu đề cho JWT sử dụng thuật toán ký HS256
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        // Xây dựng JWT với các thông tin cần thiết
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(phone) // Subject của JWT là số điện thoại người dùng
                .issuer("kkq") // Người phát hành (issuer) là "kkq"
                .issueTime(new Date()) // Thời gian phát hành JWT
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli())) // Thời gian hết hạn của JWT là 1 giờ
                .claim("authorities", "ROLE_USER") // Claim bổ sung, định nghĩa quyền hạn (role) là "ROLE_USER"
                .build(); // Hoàn thành việc xây dựng claims

        // Chuyển claims thành payload cho JWT
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        // Tạo đối tượng JWSObject chứa header và payload
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            // Ký JWT bằng khóa bí mật
            jwsObject.sign(new MACSigner(signerKey.getBytes()));

            // Trả về JWT đã được ký (token) dưới dạng chuỗi
            return jwsObject.serialize();
        } catch (JOSEException e) {
            // Log lỗi nếu không thể tạo token JWT và ném ra ngoại lệ
            log.error("Cannot generate token", e);
            throw new RuntimeException(e);
        }
    }
    //    @Override
    //    public Auth save(Auth authority) {
    //        return authRepository.save(authority);
    //    }
    //
    //    @Override
    //    public List<Auth> findAll() {
    //        return authRepository.findAll();
    //    }
    //
    //    @Override
    //    public void deleteById(int id) {}
}
