package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.RoleResponse;
import com.rrms.rrms.models.Role;

@Mapper(componentModel = "spring") // Mapper sử dụng MapStruct
public interface RoleMapper {

    // Chuyển đổi từ RoleRequest sang Role
    @Mapping(
            target = "description",
            source = "roleDescription") // Thiết lập rằng trường "description" trong Role sẽ nhận giá trị từ trường
    // "roleDescription" trong RoleRequest
    @Mapping(
            target = "permissions",
            ignore = true) // Bỏ qua trường "permissions" trong Role, không chuyển đổi từ RoleRequest
    Role toRole(RoleRequest request); // Phương thức này nhận một RoleRequest và trả về đối tượng Role

    // Chuyển đổi từ Role sang RoleResponse
    @Mapping(
            target = "roleDescription",
            source = "description") // Thiết lập rằng trường "roleDescription" trong RoleResponse sẽ nhận giá trị từ
    // trường "description" trong Role
    @Mapping(
            target = "roleId",
            source = "roleId") // Thiết lập rằng trường "roleId" trong RoleResponse sẽ nhận giá trị từ trường "roleId"
    // trong Role
    RoleResponse toRoleResponse(Role role); // Phương thức này nhận một Role và trả về đối tượng RoleResponse
}
