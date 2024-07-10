package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.Entities.User;
import com.careerPath.CareerPath.Repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserRegistrationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testUserRegistration() throws Exception {
        User request = new User();
        request.setFirstName("Adina");
        request.setLastName("Valcauan");
        request.setEmail("adina.valcauan@outlook.com");
        request.setPassword("Password1234!");

        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk());

        Optional<User> optionalUser = userRepository.findByEmail("adina.valcauan@outlook.com");
        optionalUser.ifPresent(user -> {
            assertThat(user.getFirstName()).isEqualTo("Adina");
            assertThat(user.getLastName()).isEqualTo("Valcauan");
        });
    }
}
