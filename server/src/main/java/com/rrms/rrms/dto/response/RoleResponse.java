package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse implements Serializable {
    UUID roleId;
    String roleName;
    String roleDescription;
    Set<PermissionResponse> permissions;
}
