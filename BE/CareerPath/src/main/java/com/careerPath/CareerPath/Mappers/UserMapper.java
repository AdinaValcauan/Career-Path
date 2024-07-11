package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.UserDTO;
import com.careerPath.CareerPath.Entities.Role;
import com.careerPath.CareerPath.Entities.User;
import com.careerPath.CareerPath.Repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
public class UserMapper implements Function<UserDTO, User> {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User apply(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPassword(userDTO.getPassword());

        if (userDTO.getRole() != null) {
            Optional<Role> roleFromDb = roleRepository.findById(userDTO.getRole().getRoleId());
            if (roleFromDb.isPresent()) {
                user.setRole(roleFromDb.get());
            }
        }

        return user;
    }
}