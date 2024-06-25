package com.careerPath.CareerPath.DTOs;

import com.careerPath.CareerPath.Entities.Role;
import com.fasterxml.jackson.databind.AnnotationIntrospector;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private RoleDTO role;

}
