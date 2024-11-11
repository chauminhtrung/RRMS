package com.rrms.rrms.services.servicesImp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordByEmail;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.request.RegisterRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.AccountMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.Permission;
import com.rrms.rrms.models.Role;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.repositories.RoleRepository;
import com.rrms.rrms.services.IAccountService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountService implements IAccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AuthRepository authRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AccountMapper accountMapper;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public List<AccountResponse> findAll() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map(accountMapper::toAccountResponse).collect(Collectors.toList());
    }

    @Override
    public List<AccountResponse> getAccountsByRole(Roles role) {
        List<Account> accounts = accountRepository.findAllByAuthorities_Role_RoleName(role);
        return accounts.stream().map(accountMapper::toAccountResponse).collect(Collectors.toList());
    }

    public List<AccountResponse> searchAccounts(String search) {
        List<Account> searchResults = accountRepository.searchAccounts(search);
        return searchResults.stream().map(accountMapper::toAccountResponse).collect(Collectors.toList());
    }

    @Override
    public Optional<Account> findAccountsByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public Optional<Account> findByPhone(String phone) {
        return accountRepository.findByPhone(phone);
    }

    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public Account register(RegisterRequest request) {
        // Kiểm tra xem username hoặc phone đã tồn tại chưa
        if (accountRepository.existsByUsername(request.getUsername())
                || accountRepository.existsByPhone(request.getPhone())) {
            throw new AppException(ErrorCode.ACCOUNT_ALREADY_EXISTS);
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // Tạo đối tượng Account mới
        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPhone(request.getPhone());
        account.setPassword(encodedPassword);
        account.setEmail(request.getEmail());
        // Lưu tài khoản vào cơ sở dữ liệu
        Account savedAccount = accountRepository.save(account);

        // Lấy role CUSTOMER từ cơ sở dữ liệu
        Role customerRole;
        if ("CUSTOMER".equals(request.getUserType())) {
            customerRole = roleRepository
                    .findByRoleName(Roles.CUSTOMER)
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        } else {
            customerRole = roleRepository
                    .findByRoleName(Roles.HOST)
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        }

        // Tạo đối tượng Auth và gán role CUSTOMER cho tài khoản
        Auth auth = new Auth();
        auth.setAccount(savedAccount);
        auth.setRole(customerRole);
        authRepository.save(auth);

        return savedAccount;
    }

    @Override
    public Optional<Account> login(String phone, String password) {
        Optional<Account> accountOptional = accountRepository.findByPhone(phone);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            if (passwordEncoder.matches(password, account.getPassword())) {
                return Optional.of(account);
            } else {
                throw new AppException(ErrorCode.INVALID_PASSWORD);
            }
        }
        return Optional.empty();
    }

    @Override
    public AccountResponse createAccount(AccountRequest accountRequest) {
        // Kiểm tra xem tên đăng nhập hoặc số điện thoại đã tồn tại hay chưa
        if (accountRepository.existsByUsername(accountRequest.getUsername())
                || accountRepository.existsByPhone(accountRequest.getPhone())) {
            throw new AppException(ErrorCode.ACCOUNT_ALREADY_EXISTS);
        }

        // Tạo đối tượng Account mới
        Account account = new Account();
        account.setUsername(accountRequest.getUsername());
        account.setFullname(accountRequest.getFullname());
        account.setPhone(accountRequest.getPhone());
        account.setEmail(accountRequest.getEmail());
        account.setBirthday(accountRequest.getBirthday());
        account.setGender(accountRequest.getGender());
        account.setCccd(accountRequest.getCccd());
        account.setAvatar(accountRequest.getAvatar());

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(accountRequest.getPassword());
        account.setPassword(encodedPassword);

        // Khởi tạo danh sách authorities để tránh NullPointerException
        account.setAuthorities(new ArrayList<>());

        // Lưu tài khoản trước
        Account savedAccount = accountRepository.save(account);

        // Xử lý danh sách vai trò
        if (accountRequest.getRole() != null && !accountRequest.getRole().isEmpty()) {
            for (String roleName : accountRequest.getRole()) {
                // Chuyển đổi roleName thành Roles enum
                Roles roleEnum;
                try {
                    roleEnum = Roles.valueOf(roleName.toUpperCase());
                } catch (IllegalArgumentException e) {
                    throw new AppException(ErrorCode.ROLE_NOT_FOUND);
                }

                Optional<Role> roleOptional = roleRepository.findByRoleName(roleEnum);
                if (roleOptional.isPresent()) {
                    Role role = roleOptional.get();

                    // Tạo đối tượng Auth mới cho mỗi vai trò và liên kết tài khoản với vai trò
                    Auth auth = new Auth();
                    auth.setAccount(savedAccount);
                    auth.setRole(role);

                    // Thêm quyền vào danh sách authorities của tài khoản
                    savedAccount.getAuthorities().add(auth);

                    // Lưu dữ liệu quyền vào cơ sở dữ liệu
                    authRepository.save(auth);
                } else {
                    throw new AppException(ErrorCode.ROLE_NOT_FOUND);
                }
            }
        } else {
            throw new AppException(ErrorCode.ROLE_NOT_PROVIDED);
        }

        return convertToAccountResponse(savedAccount);
    }

    private AccountResponse convertToAccountResponse(Account account) {
        AccountResponse response = new AccountResponse();
        response.setUsername(account.getUsername());
        response.setFullname(account.getFullname());
        response.setPhone(account.getPhone());
        response.setEmail(account.getEmail());
        response.setBirthday(java.sql.Date.valueOf(account.getBirthday()));
        response.setGender(account.getGender());
        response.setCccd(account.getCccd());
        response.setAvatar(account.getAvatar());

        // Lấy danh sách các vai trò từ account và chuyển thành List<String>
        List<String> roles = account.getAuthorities().stream()
                .map(auth -> auth.getRole().getRoleName().name())
                .distinct() // Đảm bảo không có trùng lặp
                .collect(Collectors.toList());
        response.setRole(roles);

        // Lấy quyền từ danh sách authorities và chuyển đổi thành List<String>
        List<String> permissions = account.getAuthorities().stream()
                .flatMap(auth -> auth.getRole().getPermissions().stream().map(Permission::getName)) // Chỉ lấy tên quyền
                .distinct() // Để loại bỏ trùng lặp nếu cần
                .collect(Collectors.toList());
        response.setPermissions(permissions);

        return response;
    }

    @Override
    public AccountResponse updateAccount(String username, AccountRequest accountRequest) {
        // Kiểm tra xem tài khoản có tồn tại hay không
        Optional<Account> accountOptional = accountRepository.findById(username);
        if (!accountOptional.isPresent()) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_FOUND);
        }

        // Lấy tài khoản đã tồn tại
        Account account = accountOptional.get();

        // Cập nhật thông tin
        account.setFullname(accountRequest.getFullname());
        account.setPhone(accountRequest.getPhone());
        account.setEmail(accountRequest.getEmail());
        account.setBirthday(accountRequest.getBirthday());
        account.setGender(accountRequest.getGender());
        account.setCccd(accountRequest.getCccd());
        account.setAvatar(accountRequest.getAvatar());

        // Nếu mật khẩu mới được cung cấp, mã hóa và cập nhật
        if (accountRequest.getPassword() != null
                && !accountRequest.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(accountRequest.getPassword());
            account.setPassword(encodedPassword);
        }

        // Lưu tài khoản vào cơ sở dữ liệu
        Account updatedAccount = accountRepository.save(account);

        return convertToAccountResponse(updatedAccount); // Trả về AccountResponse cho tài khoản đã cập nhật
    }

    @Override
    @Transactional
    public void deleteAccount(String username) {
        // Kiểm tra xem tài khoản có tồn tại hay không
        if (!accountRepository.existsById(username)) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_FOUND);
        }

        // Xóa các bản ghi liên quan trong bảng auths
        authRepository.deleteByAccount_Username(username);

        // Xóa tài khoản từ cơ sở dữ liệu
        accountRepository.deleteById(username);
    }

    @Override
    public Account updateAcc(String username, Account account) {
        return accountRepository.save(account);
    }

    // @Cacheable(value = "account", key = "#username")
    @Override
    public AccountResponse findByUsername(String username) {
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public AccountResponse save(AccountRequest accountRequest) {
        Account account = accountMapper.toAccount(accountRequest);
        account = accountRepository.save(account);
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public AccountResponse update(AccountRequest accountRequest) {
        Account account = accountRepository
                .findByUsername(accountRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        accountMapper.updateAccount(account, accountRequest);
        account = accountRepository.save(account);
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public String changePassword(ChangePasswordRequest changePasswordRequest) {
        Account account = accountRepository
                .findByUsername(changePasswordRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        BCryptPasswordEncoder pe = new BCryptPasswordEncoder();

        // Nếu password cũ không khớp với password trong database
        if (!pe.matches(changePasswordRequest.getOldPassword(), account.getPassword())) {
            return "Old password is not correct";
        }

        // Nếu password mới trùng với password cũ
        if (pe.matches(changePasswordRequest.getNewPassword(), account.getPassword())) {
            return "New password cannot be the same as the old password";
        }

        String hashedNewPassword = pe.encode(changePasswordRequest.getNewPassword());

        account.setPassword(hashedNewPassword);
        accountRepository.save(account);

        return "Password changed successfully";
    }

    @Override
    public boolean changePasswordByEmail(ChangePasswordByEmail changePasswordByEmail) {
        if (!accountRepository.existsAccountByEmail(changePasswordByEmail.getEmail())) {
            return false;
        }
        try {
            Account account = accountRepository
                    .findByEmail(changePasswordByEmail.getEmail())
                    .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
            BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
            String hashedNewPassword = pe.encode(changePasswordByEmail.getNewPassword());
            account.setPassword(hashedNewPassword);
            accountRepository.save(account);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        return accountRepository.existsAccountByEmail(email);
    }
}
