package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.AuthRequest;
import com.careerPath.CareerPath.Entities.User;
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


    @GetMapping("/login/{id}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public User getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }

    @PostMapping("/register")
    public String register(@RequestBody User user){

        return userService.addUser(user);
    }

    @PostMapping("/addUser")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addUser(@RequestBody User user){

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
    //@PreAuthorize("hasAnyAuthority('admin')") //this helps us authorize only specific roles
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable Integer id){
        return userService.getUserById(id);
    }

    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable int id){
        userService.deleteUser(id);
    }

}