package com.example.vehiclerentalplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerentalplatform.model.Permissions;
import com.example.vehiclerentalplatform.model.RolePermissions;
import com.example.vehiclerentalplatform.model.Roles;
import com.example.vehiclerentalplatform.model.UserPermissions;
import com.example.vehiclerentalplatform.service.PermissionUpdateService;

@RestController
@RequestMapping("/permissions")
//@PreAuthorize("hasRole('ADMIN')")
public class PermissionsUpdateController {

    @Autowired
    private PermissionUpdateService permissionUpdateService;

    @GetMapping("/viewall")
    public ResponseEntity<List<Object>> getAllRolesAndPermissions(){
        return new ResponseEntity<>(permissionUpdateService.getAllDetails(),HttpStatus.OK);
    }

    @PostMapping("/addRole")
    public ResponseEntity<Roles> addNewRole(@RequestBody Roles newRole){
        return new ResponseEntity<>(permissionUpdateService.addNewRole(newRole),HttpStatus.OK);
    }

    @PostMapping("/addPermission")
    public ResponseEntity<Permissions> addNewPermission(@RequestBody Permissions newPermissions){
        return new ResponseEntity<>(permissionUpdateService.addNewPermissions(newPermissions),HttpStatus.OK);
    }

    @PostMapping("/addRolePermission")
    public ResponseEntity<RolePermissions> addNewRolePermission(@RequestBody RolePermissions newRolePermissions){
        return new ResponseEntity<>(permissionUpdateService.addNewRolePermissions(newRolePermissions),HttpStatus.OK);
    }

    @PostMapping("/addUserPermission")
    public ResponseEntity<UserPermissions> addNewUserPermission(@RequestBody UserPermissions newUserPermissions){
        return new ResponseEntity<>(permissionUpdateService.addNewUserPermissions(newUserPermissions),HttpStatus.OK);
    }
}
