package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.UserDTO;
import com.careerPath.CareerPath.Entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IUserService extends UserDetailsService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(int id);
    String addUser(UserDTO userDTO);
    UserDTO updateUser(int id, UserDTO userDTO);
    void deleteUser(int id);
    UserDetails loadUserByUsername(String username);
    String getUserRoles(String userEmail);
    Integer getUserByEmail(String userEmail);

}
