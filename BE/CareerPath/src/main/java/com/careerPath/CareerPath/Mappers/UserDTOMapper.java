package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.RoleDTO;
import com.careerPath.CareerPath.DTOs.UserDTO;
import com.careerPath.CareerPath.Entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        RoleDTO role = new RoleDTO(user.getRole().getRoleId(), user.getRole().getRoleName());

        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                role
        );
    }
}
