package com.careerPath.CareerPath.Mapper;

import com.careerPath.CareerPath.DTO.UserDTO;
import com.careerPath.CareerPath.Entity.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                user.getRoles()
        );
    }
}
//needs more work