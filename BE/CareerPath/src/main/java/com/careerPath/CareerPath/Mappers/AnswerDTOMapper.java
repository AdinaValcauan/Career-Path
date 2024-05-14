package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Entities.Answer;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AnswerDTOMapper implements Function<Answer, AnswerDTO> {
    @Override
    public AnswerDTO apply(Answer answer) {
        return new AnswerDTO(
                answer.getAnswerId(),
                answer.getQuestionId(),
                answer.getAnswerText()
        );
    }
}