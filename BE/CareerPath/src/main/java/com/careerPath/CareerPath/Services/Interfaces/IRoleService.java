package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Role;

import java.util.List;

public interface IRoleService {
    Integer getIdByName(String roleName);
    List<Role> getRoles();
}
