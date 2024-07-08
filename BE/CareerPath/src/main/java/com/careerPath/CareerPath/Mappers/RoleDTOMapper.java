package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.RoleDTO;
import com.careerPath.CareerPath.Entities.Role;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class RoleDTOMapper implements Function<Role, RoleDTO> {
    @Override
    public RoleDTO apply(Role role) {
        return new RoleDTO(
                role.getRoleId(),
                role.getRoleName()
        );
    }
}