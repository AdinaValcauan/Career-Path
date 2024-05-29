package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class QuestionMapper implements Function<QuestionDTO, Question> {
    private final IDayService dayService;

    @Autowired
    public QuestionMapper(IDayService dayService) {
        this.dayService = dayService;
    }

    @Override
    public Question apply(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestionId(questionDTO.getQuestionId());
        question.setDay(dayService.getDayById(questionDTO.getDayId()));
        question.setOrderForm(questionDTO.getOrderForm());
        question.setQuestionText(questionDTO.getQuestionText());
        return question;
    }
}