package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Role;
import com.careerPath.CareerPath.Entities.User;
import com.careerPath.CareerPath.Exceptions.UserAlreadyExistsException;
import com.careerPath.CareerPath.Repositories.RoleRepository;
import com.careerPath.CareerPath.Security.UserInfoDetails;
import com.careerPath.CareerPath.Repositories.UserRepository;
import com.careerPath.CareerPath.Services.Interfaces.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).get();
    }

    public String addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("User already exists!");
        }

        Role userRole = roleRepository.findByRoleName("user").orElse(null);
        Role adminRole = roleRepository.findByRoleName("admin").orElse(null);

//        if (user.getRoles() == null || user.getRoles().isEmpty() || user.getRoles().contains(userRole)) {
//            if (userRole != null) {
//                user.getRoles().clear();
//                user.getRoles().add(userRole);
//            }
//        } else if (user.getRoles().contains(adminRole)) {
//            if (adminRole != null) {
//                user.getRoles().clear();
//                user.getRoles().add(adminRole);
//            }
//        }

        if (user.getRole() == null || user.getRole().equals(userRole)) {
            if (userRole != null) {
                user.setRole(userRole);
            }
        } else if (user.getRole().equals(adminRole)) {
            if (adminRole != null) {
                user.setRole(adminRole);
            }
        }

        userRepository.save(user);
        return "User added successfully \n"+user;
    }

    public User updateUser(int id, User user) {
        User existingUser = userRepository.findById(id).get();

        if (user.getFirstName()!=null && !user.getFirstName().isEmpty()) {
            existingUser.setFirstName(user.getFirstName());
        }
        if (user.getLastName()!=null && !user.getLastName().isEmpty()) {
            existingUser.setLastName(user.getLastName());
        }
        if (user.getEmail()!=null && !user.getEmail().isEmpty()) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getPassword()!=null && !user.getEmail().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getRole()!=null) {
            Role existingRole = roleRepository.findByRoleName(user.getRole().getRoleName()).orElse(null);
            if (existingRole != null) {
                existingUser.setRole(existingRole);
            }
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(int id) {
        User userToDelete = userRepository.findById(id).get();
        userRepository.delete(userToDelete);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        return user.map(UserInfoDetails::new)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"+username));
    }

    public String getUserRoles(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        User user = userOptional.get();

        return user.getRole().getRoleName();
    }

    public Integer getUserByEmail(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        User user = userOptional.get();

        return user.getId();
    }

}