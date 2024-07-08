package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.DTOs.UserDTO;
import com.careerPath.CareerPath.Entities.Answer;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Entities.User;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import com.careerPath.CareerPath.Services.Interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AnswerMapper implements Function<AnswerDTO, Answer> {
    private final IQuestionService questionService;
    private final IUserService userService;
    private final UserMapper userMapper;
    private final QuestionMapper questionMapper;
    @Autowired
    public AnswerMapper(IQuestionService questionService, IUserService userService, UserMapper userMapper, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.userService = userService;
        this.userMapper = userMapper;
        this.questionMapper = questionMapper;
    }

    @Override
    public Answer apply(AnswerDTO answerDTO) {
        Answer answer = new Answer();
        answer.setAnswerId(answerDTO.getAnswerId());
        answer.setAnswerText(answerDTO.getAnswerText());

        QuestionDTO questionDTO = questionService.getQuestionById(answerDTO.getQuestionId());
        Question question = questionMapper.apply(questionDTO);
        answer.setQuestion(question);

        UserDTO userDTO = userService.getUserById(answerDTO.getUserId());
        User user = userMapper.apply(userDTO);
        answer.setUser(user);

        return answer;
    }
}
