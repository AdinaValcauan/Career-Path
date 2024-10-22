package com.careerPath.CareerPath.Security;

import com.careerPath.CareerPath.Entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class UserInfoDetails implements UserDetails {
    String userEmail;
    String userPassword;
    List<GrantedAuthority> authorities;

    public UserInfoDetails(User user){
        userEmail = user.getEmail();
        userPassword = user.getPassword();
        authorities = Arrays.asList(new SimpleGrantedAuthority(user.getRole().getRoleName()));
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
