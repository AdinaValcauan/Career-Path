package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Entities.Answer;

import java.util.List;
import java.util.Optional;

public interface IAnswerService {
    List<AnswerDTO> getAllAnswers();
    AnswerDTO getAnswerById(int answerId);
    String addAnswer(AnswerDTO answerDTO);
    AnswerDTO updateAnswer(int answerId, AnswerDTO answerDTO);
    void deleteAnswer(int answerId);
    Optional<AnswerDTO>  getAnswerByDayAndUser(int questionId, int id);
}
