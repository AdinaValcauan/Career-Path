package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Answer;

import java.util.List;
import java.util.Optional;

public interface IAnswerService {
    List<Answer> getAllAnswers();
    Answer getAnswerById(int answerId);
    String addAnswer(Answer answer);
    Answer updateAnswer(int answerId, Answer answer);
    void deleteAnswer(int answerId);
    Optional<Answer>  getAnswerByDayAndUser(int questionId, int id);
}
