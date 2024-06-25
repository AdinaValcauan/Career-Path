package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.Entities.Role;
import com.careerPath.CareerPath.Services.Interfaces.IRoleService;
import com.careerPath.CareerPath.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {
    @Autowired
    private IRoleService roleService;

    @GetMapping("/getRoleId/{roleName}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public Integer getRoleIdByName(@PathVariable String roleName) {
        return roleService.getIdByName(roleName);
    }

    @GetMapping("/getRoles")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<Role> getRoles() {
        return roleService.getRoles();
    }
}
