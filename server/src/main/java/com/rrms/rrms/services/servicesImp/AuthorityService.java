package com.rrms.rrms.services.servicesImp;

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
import com.rrms.rrms.dto.request.LogoutRequest;
import com.rrms.rrms.dto.response.IntrospecTokenResponse;
import com.rrms.rrms.dto.response.LoginResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.InvalidatedToken;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.repositories.InvalidatedTokenRepository;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import com.rrms.rrms.services.IAuthorityService;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class AuthorityService implements IAuthorityService {

  @Autowired
  InvalidatedTokenRepository tokenRepository;

  @Autowired
  AccountService accountService;

  @Autowired
  AuthRepository authRepository;

  @Value("${jwt.signer-key}")
  private String signerKey;

  public IntrospecTokenResponse introspect(IntrospecTokenRequest request)
      throws ParseException, JOSEException {
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

      // Gọi hàm verifyToken để xác thực token
      String verificationResult = verifyToken(token);
      if (!verificationResult.equals("Token signature is valid")) {
        return IntrospecTokenResponse.builder()
            .valid(false)
            .message(verificationResult) // Trả về thông báo lỗi từ verifyToken
            .build();
      }

      // Parse chuỗi JWT thành đối tượng SignedJWT để có thể xử lý
      SignedJWT signedJWT = SignedJWT.parse(token);
      JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
      List<String> roles = claimsSet.getStringListClaim("roles");
      List<String> permissions = claimsSet.getStringListClaim("permissions");
      Date expirationTime = claimsSet.getExpirationTime();

      // Kiểm tra token đã hết hạn chưa
      if (expirationTime == null || expirationTime.before(new Date())) {
        return IntrospecTokenResponse.builder()
            .valid(false)
            .message("Token has expired")
            .build();
      }

      // Nếu token hợp lệ (chữ ký đúng và chưa hết hạn)
      return IntrospecTokenResponse.builder()
          .valid(true)                        // Token hợp lệ
          .message("Token is valid")          // Message thông báo
          .subject(claimsSet.getSubject())    // Subject của token (thường là username/phone)
          .expirationTime(expirationTime)     // Thời gian hết hạn
          .issuer(claimsSet.getIssuer())      // Issuer (người phát hành token)
          .issuedAt(claimsSet.getIssueTime()) // Thời gian phát hành token
          .roles(roles)                       // Thêm roles vào response
          .permissions(permissions)           // Thêm permissions vào response
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
    Account account = accountService.login(request.getPhone(), request.getPassword())
        .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

    // Tạo token JWT cho tài khoản sau khi đăng nhập thành công
    var token = generateToken(account);

    // Xây dựng đối tượng LoginResponse với các thông tin cần thiết
    return LoginResponse.builder()
        .token(token)                       // Token JWT
        .authenticated(true)                // Trạng thái xác thực thành công
        .username(account.getUsername())    // Tên người dùng
        .fullname(account.getFullname())    // Họ và tên đầy đủ
        .phone(account.getPhone())
        .email(account.getEmail())          // Địa chỉ email
        .avatar(account.getAvatar())        // Ảnh đại diện (avatar)
        .birthday(account.getBirthday())    // Ngày sinh của người dùng
        .gender(account.getGender())        // Giới tính
        .cccd(account.getCccd())            // CCCD (Chứng minh nhân dân)
        .build();                           // Hoàn thành việc xây dựng LoginResponse
  }

  public String generateToken(Account account) {
    // Tạo tiêu đề cho JWT sử dụng thuật toán ký HS512
    JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

    // Lấy danh sách role và permission từ tài khoản
    List<String> roles = account.getAuthorities().stream()
        .map(auth -> auth.getRole().getRoleName().name())  // Lấy tên của các role
        .collect(Collectors.toList());

    List<String> permissions = account.getAuthorities().stream()
        .flatMap(auth -> auth.getRole().getPermissions().stream())  // Lấy các permissions từ role
        .map(permission -> permission.getName())  // Lấy tên của các permission
        .distinct()  // Loại bỏ trùng lặp nếu có
        .collect(Collectors.toList());

    // Xây dựng JWT với các thông tin cần thiết
    JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
        .subject(account.getPhone())  // Subject của JWT là số điện thoại người dùng
        .issuer(account.getUsername()) // Người phát hành (issuer)
        .issueTime(new Date())        // Thời gian phát hành JWT
        .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))  // Thời gian hết hạn của JWT là 1 giờ
        .claim("roles", roles)  // Thêm danh sách roles vào claim
        .jwtID(UUID.randomUUID().toString())
        .claim("permissions", permissions)  // Thêm danh sách permissions vào claim
        .build();  // Hoàn thành việc xây dựng claims

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
  public void logout(LogoutRequest request) throws ParseException, JOSEException {
    try {
      // Lấy token từ request
      String token = request.getToken();

      // Parse token JWT thành SignedJWT
      SignedJWT signedJWT = SignedJWT.parse(token);

      // Lấy thông tin JWTClaimsSet từ token
      JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();

      // Lấy JWT ID (jit) và thời gian hết hạn của token
      String jit = claimsSet.getJWTID();
      Date expirationTime = claimsSet.getExpirationTime();

      // Tạo đối tượng InvalidatedToken với thông tin từ token để lưu vào blacklist
      InvalidatedToken invalidatedToken = InvalidatedToken.builder()
          .id(jit)
          .expiryTime(expirationTime)
          .build();

      // Lưu token bị vô hiệu hóa vào repository
      tokenRepository.save(invalidatedToken);

    } catch (ParseException e) {
      // Log lỗi nếu có lỗi trong quá trình xử lý token
      log.error("Error during logout", e);
      throw e;
    }
  }

  @Override
  public Auth save(Auth auth) {
    return authRepository.save(auth);
  }

  private String verifyToken(String token) throws ParseException, JOSEException {
    try {
      // Parse chuỗi JWT thành đối tượng SignedJWT để có thể xử lý
      SignedJWT signedJWT = SignedJWT.parse(token);

      // Tạo đối tượng verifier với secret key để verify chữ ký của token
      JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

      // Kiểm tra tính hợp lệ của chữ ký token
      boolean isSignatureValid = signedJWT.verify(verifier);

      // Nếu chữ ký không hợp lệ, trả về chuỗi thông báo lỗi
      if (!isSignatureValid) {
        return "Invalid token signature";
      }

      // Nếu chữ ký hợp lệ, trả về chuỗi xác nhận hợp lệ
      return "Token signature is valid";

    } catch (Exception e) {
      // Log lại lỗi nếu có exception xảy ra trong quá trình xác thực token
      log.error("Error verifying token", e);

      // Trả về chuỗi thông báo lỗi
      return "Error verifying token: " + e.getMessage();
    }
  }
}
