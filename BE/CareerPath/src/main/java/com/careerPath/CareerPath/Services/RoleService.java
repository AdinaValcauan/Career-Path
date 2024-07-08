package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.RoleDTO;
import com.careerPath.CareerPath.Entities.Role;
import com.careerPath.CareerPath.Mappers.RoleDTOMapper;
import com.careerPath.CareerPath.Mappers.RoleMapper;
import com.careerPath.CareerPath.Repositories.RoleRepository;
import com.careerPath.CareerPath.Services.Interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private RoleDTOMapper roleDTOMapper;

    public Integer getIdByName(String roleName) {
        Optional<Role> role = roleRepository.findByRoleName(roleName);
        return role.map(Role::getRoleId).orElse(null);
    }

    public List<RoleDTO> getRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map(roleDTOMapper)
                .collect(Collectors.toList());
    }
}