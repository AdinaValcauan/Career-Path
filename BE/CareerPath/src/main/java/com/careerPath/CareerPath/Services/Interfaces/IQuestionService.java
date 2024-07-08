package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Entities.Question;

import java.util.List;

public interface IQuestionService {
    List<QuestionDTO> getAllQuestions();
    QuestionDTO getQuestionById(int questionId);
    String addQuestion(QuestionDTO questionDTO);
    QuestionDTO updateQuestion(int questionId, QuestionDTO questionDTO);
    void deleteQuestion(int questionId);
    List<QuestionDTO> getQuestionsByDay(int dayId);
    QuestionDTO updateOrderForm(int questionId, int orderForm);
}
