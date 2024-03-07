package com.example.vehiclerentalplatform.service.implementaion;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vehiclerentalplatform.model.Permissions;
import com.example.vehiclerentalplatform.model.RolePermissions;
import com.example.vehiclerentalplatform.model.Roles;
import com.example.vehiclerentalplatform.model.UserPermissions;
import com.example.vehiclerentalplatform.repository.PermissionsRepository;
import com.example.vehiclerentalplatform.repository.RolePermissionsRepository;
import com.example.vehiclerentalplatform.repository.RolesRepository;
import com.example.vehiclerentalplatform.repository.UserPermissionsRepository;
import com.example.vehiclerentalplatform.security.model.UserEntity;
import com.example.vehiclerentalplatform.service.PermissionUpdateService;

@Service
public class PermissionUpdateServiceImpl implements PermissionUpdateService{
    @Autowired
    private RolesRepository rolesRepo;

    @Autowired
    private PermissionsRepository permissionsRepo;

    @Autowired
    private RolePermissionsRepository rolePermissionsRepo;

    @Autowired
    private UserPermissionsRepository userPermissionsRepo;


    @Override
    public List<Object> getAllDetails() {
        List<Object> al = new ArrayList<>();
        al.add(rolesRepo.findAll());
        al.add(permissionsRepo.findAll());
        al.add(rolePermissionsRepo.findAll());
        al.add(userPermissionsRepo.findAll());

        return al;
    }


    @Override
    public Roles addNewRole(Roles newRole) {
        return rolesRepo.save(newRole);
    }


    @Override
    public Permissions addNewPermissions(Permissions newPermissions) {
        return permissionsRepo.save(newPermissions);
    }


    @Override
    public RolePermissions addNewRolePermissions(RolePermissions newRolePermissions) {
        return rolePermissionsRepo.save(newRolePermissions);
    }

    
    @Override
    public UserPermissions addNewUserPermissions(UserPermissions newUserPermissions) {
        return userPermissionsRepo.save(newUserPermissions);
    } 

    @Override
    public void addNewUserPermissionsFromUserEntity(UserEntity newUserPermissions) {
        List<Permissions> al = new ArrayList<>(rolePermissionsRepo.findByRole(newUserPermissions.getRole()).getRolePermissions());
        UserPermissions up = new UserPermissions();
        up.setUser(newUserPermissions);
        up.setUserPermissions(al);
        userPermissionsRepo.save(up);
    } 

    @Override
    public List<String> getPermissions(UserEntity id){
        UserPermissions up1 = userPermissionsRepo.findByUser(id);

        List<String> al = new ArrayList<>();
        for(int i=0;i<up1.getUserPermissions().size();i++){
            al.add(permissionsRepo.findBy_id(up1.getUserPermissions().get(i).get_id()).getPermission());
        }
        return al;
    }
}
