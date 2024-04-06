package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.User;
import com.careerPath.CareerPath.Exceptions.UserAlreadyExistsException;
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

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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

        if (user.getRoles() == null || user.getRoles().isEmpty() || user.getRoles().equals("")) {
            user.setRoles("user");
        } else if (user.getRoles().equals("admin")){
            user.setRoles("admin");
        }

        userRepository.save(user);
        return "User added successfully \n"+user;
    }

    public User updateUser(int id, User user) {
        User existingUser = userRepository.findById(id).get();
        existingUser.setEmail(user.getEmail());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setPassword(user.getPassword());
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

        return user.getRoles();
    }

}