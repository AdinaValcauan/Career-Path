package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Optional<Answer> findByQuestion_QuestionIdAndUser_Id(int questionId, int userId);
}
