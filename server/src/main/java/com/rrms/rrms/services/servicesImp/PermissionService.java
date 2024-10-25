package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.PermissionRequest;
import com.rrms.rrms.dto.response.PermissionResponse;
import com.rrms.rrms.mapper.PermissionMapper;
import com.rrms.rrms.models.Permission;
import com.rrms.rrms.repositories.PermissionRepository;
import com.rrms.rrms.services.IPermissionService;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PermissionService implements IPermissionService {

  @Autowired
  PermissionRepository permissionRepository;

  @Autowired
  PermissionMapper permissionMapper;

  @Override
  public List<PermissionResponse> getAllPermissions() {
    List<Permission> permissions = permissionRepository.findAll();
    return permissions.stream().map(permissionMapper :: toPermissionResponse).toList();
  }

  @Override
  public PermissionResponse createPermission(PermissionRequest permissionRequest) {
    Permission permission = permissionMapper.toPermission(permissionRequest);
    permission = permissionRepository.save(permission);
    return permissionMapper.toPermissionResponse(permission);
  }

  @Override
  public PermissionResponse updatePermission(PermissionRequest permissionRequest) {
    Permission existingPermission = permissionRepository.findById(permissionRequest.getPermissionId())
        .orElseThrow(() -> new RuntimeException("Permission not found"));

    existingPermission.setName(permissionRequest.getName());
    existingPermission.setDescription(permissionRequest.getDescription());

    existingPermission = permissionRepository.save(existingPermission);
    return permissionMapper.toPermissionResponse(existingPermission);
  }

  @Override
  public void deletePermission(UUID id) {
    if (!permissionRepository.existsById(id)) {
      throw new RuntimeException("Permission not found");
    }
    permissionRepository.deleteById(id);
  }

  @Override
  public PermissionResponse getPermissionById(Long id) {
    return null;
  }
}
