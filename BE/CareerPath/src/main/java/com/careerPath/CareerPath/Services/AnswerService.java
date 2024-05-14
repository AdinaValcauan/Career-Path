package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Answer;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Repositories.AnswerRepository;
import com.careerPath.CareerPath.Services.Interfaces.IAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AnswerService implements IAnswerService {
    @Autowired
    private AnswerRepository answerRepository;
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Answer getAnswerById(int answerId){
        return answerRepository.findById(answerId).get();
    }

    public String addAnswer(Answer answer){
        answerRepository.save(answer);
        return "Answer added successfully \n" + answer;
    }

    public Answer updateAnswer(int answerId, Answer answer){
        Answer existingAnswer = answerRepository.findById(answerId).get();
        existingAnswer.setAnswerText(answer.getAnswerText());

        return answerRepository.save(existingAnswer);
    }

    public void deleteAnswer(int answerId){
        Answer answerToDelete = answerRepository.findById(answerId).get();
        answerRepository.delete(answerToDelete);
    }
}
