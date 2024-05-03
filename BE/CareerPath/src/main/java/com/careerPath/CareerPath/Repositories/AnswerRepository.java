package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Answer;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

}
