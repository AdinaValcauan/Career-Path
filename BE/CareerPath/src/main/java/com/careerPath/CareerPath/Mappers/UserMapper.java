package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.UserDTO;
import com.careerPath.CareerPath.Entities.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserMapper implements Function<UserDTO, User> {
    @Override
    public User apply(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPassword(userDTO.getPassword());
        user.setRoles(userDTO.getRoles());
        return user;
    }
}