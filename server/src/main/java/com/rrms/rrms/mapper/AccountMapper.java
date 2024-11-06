package com.rrms.rrms.mapper;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.BrokerResponse;
import com.rrms.rrms.models.Account;

@Mapper(
        componentModel =
                "spring") // Mapper sử dụng MapStruct,Spring tự động phát hiện và quản lý mapper này như một Bean
public interface AccountMapper {

    // Nhận một AccountRequest và trả về đối tượng Account
    Account toAccount(AccountRequest request);

    // Chuyển đổi từ Account sang AccountResponse
    @Mapping(
            target = "role",
            source = "account",
            qualifiedByName =
                    "mapRole") // Thiết lập rằng trường "role" trong AccountResponse sẽ được lấy từ phương thức mapRole
    @Mapping(target = "permissions", source = "account", qualifiedByName = "mapPermissions")
    // Thiết lập rằng trường "permissions" sẽ được lấy từ phương thức mapPermissions
    AccountResponse toAccountResponse(
            Account account); // Phương thức nhận một Account và trả về đối tượng AccountResponse

    // Phương thức để cập nhật thông tin của tài khoản người dùng mà không thay đổi mật khẩu
    @Mapping(target = "password", ignore = true)
    // Bỏ qua trường "password" trong quá trình cập nhật
    void updateAccount(
            @MappingTarget Account user, AccountRequest request); // Cập nhật user dựa trên thông tin từ AccountRequest

    // Phương thức để ánh xạ vai trò từ đối tượng Account
    @Named("mapRole") // Đánh dấu phương thức này với tên "mapRole" để có thể sử dụng trong các ánh xạ khác
    default List<String> mapRole(Account account) {
        // Kiểm tra xem account có chứa authorities không
        if (account.getAuthorities() != null && !account.getAuthorities().isEmpty()) {
            return account.getAuthorities().stream() // Chuyển đổi các authority thành danh sách tên vai trò
                    .map(auth -> auth.getRole().getRoleName().name())
                    .collect(Collectors.toList()); // Thu thập kết quả vào danh sách
        }
        return null; // Nếu không có authorities, trả về null
    }

    // Phương thức mới để ánh xạ quyền từ các vai trò
    @Named("mapPermissions") // Đánh dấu phương thức này với tên "mapPermissions" để có thể sử dụng trong các ánh xạ
    // khác
    default List<String> mapPermissions(Account account) {
        // Kiểm tra xem account có chứa authorities không
        if (account.getAuthorities() != null && !account.getAuthorities().isEmpty()) {
            return account.getAuthorities().stream() // Chuyển đổi các authority thành danh sách quyền
                    .flatMap(auth -> auth.getRole().getPermissions().stream()) // Lấy tất cả các quyền từ các vai trò
                    .map(permission -> permission.getName()) // Chỉ lấy tên của các quyền
                    .distinct() // Đảm bảo không có quyền trùng lặp
                    .collect(Collectors.toList()); // Thu thập kết quả vào danh sách
        }
        return Collections.emptyList(); // Nếu không có authorities, trả về danh sách rỗng
    }

    BrokerResponse toBrokerResponse(Account account);
}
