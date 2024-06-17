package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Entities.Question;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class QuestionDTOMapper implements Function<Question, QuestionDTO> {
    @Override
    public QuestionDTO apply(Question question) {
        return new QuestionDTO(
                question.getQuestionId(),
                question.getQuestionText(),
                question.getDay().getDayId(),
                question.getOrderForm()

        );
    }
}