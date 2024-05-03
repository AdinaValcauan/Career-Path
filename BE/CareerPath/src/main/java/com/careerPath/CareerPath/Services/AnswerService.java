package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Answer;
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
}
