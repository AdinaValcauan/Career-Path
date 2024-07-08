package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class QuestionMapper implements Function<QuestionDTO, Question> {
    private final IDayService dayService;
    private final DayMapper dayMapper;

    @Autowired
    public QuestionMapper(IDayService dayService, DayMapper dayMapper) {
        this.dayService = dayService;
        this.dayMapper = dayMapper;
    }

    @Override
    public Question apply(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestionId(questionDTO.getQuestionId());
        question.setQuestionText(questionDTO.getQuestionText());

        Day day = dayMapper.apply(dayService.getDayById(questionDTO.getDayId()));
        question.setDay(day);

        question.setOrderForm(questionDTO.getOrderForm());
        return question;
    }
}