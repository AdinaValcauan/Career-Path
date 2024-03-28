package com.careerPath.CareerPath.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private int idUser;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String roles;
}
