package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Role;
import com.careerPath.CareerPath.Repositories.RoleRepository;
import com.careerPath.CareerPath.Services.Interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Integer getIdByName(String roleName) {
        Optional<Role> role = roleRepository.findByRoleName(roleName);
        return role.map(Role::getRoleId).orElse(null);
    }

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
}