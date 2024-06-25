package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(String roleName);
    List<Role> findAll();
}
