package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Entities.Answer;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import com.careerPath.CareerPath.Services.Interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AnswerMapper implements Function<AnswerDTO, Answer> {
    private final IQuestionService questionService;
    private final IUserService userService;

    @Autowired
    public AnswerMapper(IQuestionService questionService, IUserService userService) {
        this.questionService = questionService;
        this.userService = userService;
    }

    @Override
    public Answer apply(AnswerDTO answerDTO) {
        Answer answer = new Answer();
        answer.setAnswerId(answerDTO.getAnswerId());
        answer.setAnswerText(answerDTO.getAnswerText());
        answer.setQuestion(questionService.getQuestionById(answerDTO.getQuestionId()));
        answer.setUser(userService.getUserById(answerDTO.getUserId()));
        return answer;
    }
}