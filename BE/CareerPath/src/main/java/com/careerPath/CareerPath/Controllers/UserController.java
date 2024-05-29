package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.AuthRequest;
import com.careerPath.CareerPath.DTOs.UserDTO;
import com.careerPath.CareerPath.Entities.User;
import com.careerPath.CareerPath.Mappers.UserDTOMapper;
import com.careerPath.CareerPath.Mappers.UserMapper;
import com.careerPath.CareerPath.Services.Interfaces.IJwtService;
import com.careerPath.CareerPath.Services.Interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IJwtService jwtService;

    @Autowired
    private UserDTOMapper userDTOMapper;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    public String register(@RequestBody User user){

        return userService.addUser(user);
    }

    @PostMapping("/addUser")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addUser(@RequestBody UserDTO userDTO){
        User user = userMapper.apply(userDTO);
        return userService.addUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody AuthRequest authRequest){
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserEmail(), authRequest.getUserPassword()));
        if (authenticate.isAuthenticated()){
            return jwtService.generateToken(authRequest.getUserEmail());
        } else{
            throw new UsernameNotFoundException("Invalid user request");
        }
    }

    @GetMapping("/getUsers")
    @PreAuthorize("hasAnyAuthority('admin')")
    public List<UserDTO> getAllUsers(){

        List<User> users = userService.getAllUsers();
        return users.stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    @GetMapping("/getUserById/{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public UserDTO getUserById(@PathVariable Integer id){
        User user = userService.getUserById(id);
        return userDTOMapper.apply(user);
    }

    @PutMapping("/updateUser/{id}")
    public UserDTO updateUser(@PathVariable int id, @RequestBody UserDTO userDTO){
            User user = userMapper.apply(userDTO);
            User updatedUser = userService.updateUser(id, user);
            return userDTOMapper.apply(updatedUser);
    }

    @DeleteMapping(value = "/deleteUser/{id}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteUser(@PathVariable int id){
        userService.deleteUser(id);
    }

}