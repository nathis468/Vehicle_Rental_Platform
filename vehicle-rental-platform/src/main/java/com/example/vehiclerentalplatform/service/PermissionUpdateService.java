package com.example.vehiclerentalplatform.service;

import java.util.List;

import org.apache.catalina.User;

import com.example.vehiclerentalplatform.model.Permissions;
import com.example.vehiclerentalplatform.model.RolePermissions;
import com.example.vehiclerentalplatform.model.Roles;
import com.example.vehiclerentalplatform.model.UserPermissions;
import com.example.vehiclerentalplatform.security.model.UserEntity;

public interface PermissionUpdateService {
    List<Object> getAllDetails();
    Roles addNewRole(Roles newRole);
    Permissions addNewPermissions(Permissions newPermissions);
    RolePermissions addNewRolePermissions(RolePermissions newRolePermissions);
    UserPermissions addNewUserPermissions(UserPermissions newUserPermissions);
    void addNewUserPermissionsFromUserEntity(UserEntity newUserPermissions);
    List<String> getPermissions(UserEntity id);
}