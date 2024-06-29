package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Repositories.QuestionRepository;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService implements IQuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }

    public Question getQuestionById(int questionId) {
        return questionRepository.findById(questionId).get();
    }

    public String addQuestion(Question question){
        questionRepository.save(question);
        return "Question added successfully \n" + question;
    }

    public Question updateQuestion(int questionId, Question question){
        Question existingQuestion = questionRepository.findById(questionId).get();
        existingQuestion.setQuestionText(question.getQuestionText());

        return questionRepository.save(existingQuestion);
    }

    public void deleteQuestion(int questionId) {
        Question questionToDelete = questionRepository.findById(questionId).get();
        questionRepository.delete(questionToDelete);
    }

    public List<Question> getQuestionsByDay(int dayId){
        return questionRepository.findByDay_DayIdOrderByOrderForm(dayId);
    }

    public Question updateOrderForm(int questionId, int orderForm) {
        Question existingQuestion = questionRepository.findById(questionId).get();
        existingQuestion.setOrderForm(orderForm);

        return questionRepository.save(existingQuestion);
    }
}
