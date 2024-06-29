package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Question;

import java.util.List;

public interface IQuestionService {
    List<Question> getAllQuestions();
    Question getQuestionById(int questionId);
    String addQuestion(Question question);
    Question updateQuestion(int questionId, Question question);
    void deleteQuestion(int questionId);
    List<Question> getQuestionsByDay(int dayId);
    Question updateOrderForm(int questionId, int orderForm);
}
