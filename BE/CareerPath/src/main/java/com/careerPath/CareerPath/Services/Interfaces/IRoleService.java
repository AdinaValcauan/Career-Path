package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.RoleDTO;

import java.util.List;

public interface IRoleService {
    Integer getIdByName(String roleName);
    List<RoleDTO> getRoles();
}
