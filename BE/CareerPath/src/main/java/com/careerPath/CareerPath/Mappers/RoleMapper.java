package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.RoleDTO;
import com.careerPath.CareerPath.Entities.Role;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class RoleMapper implements Function<RoleDTO, Role> {
    @Override
    public Role apply(RoleDTO roleDTO) {
        Role role = new Role();
        role.setRoleId(roleDTO.getRoleId());
        role.setRoleName(roleDTO.getName());
        return role;
    }
}