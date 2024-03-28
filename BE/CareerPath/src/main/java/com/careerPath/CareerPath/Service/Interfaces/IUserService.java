package com.careerPath.CareerPath.Service.Interfaces;

import com.careerPath.CareerPath.Entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IUserService extends UserDetailsService {
    List<User> getAllUsers();

    User getUserById(int id);

    String addUser(User user);

    User updateUser(int id, User user);

    void deleteUser(int id);
    UserDetails loadUserByUsername(String username);

    String getUserRoles(String userEmail);

}
