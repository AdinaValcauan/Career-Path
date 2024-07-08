package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Entities.Answer;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Mappers.AnswerDTOMapper;
import com.careerPath.CareerPath.Mappers.AnswerMapper;
import com.careerPath.CareerPath.Repositories.AnswerRepository;
import com.careerPath.CareerPath.Services.Interfaces.IAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AnswerService implements IAnswerService {
    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AnswerMapper answerMapper;

    @Autowired
    private AnswerDTOMapper answerDTOMapper;

    public List<AnswerDTO> getAllAnswers() {
        List<Answer> answers = answerRepository.findAll();
        return answers.stream()
                .map(answerDTOMapper)
                .collect(Collectors.toList());
    }

    public AnswerDTO getAnswerById(int answerId){
        Answer answer = answerRepository.findById(answerId).get();
        return answerDTOMapper.apply(answer);
    }

    public String addAnswer(AnswerDTO answerDTO){
        Answer answer = answerMapper.apply(answerDTO);
        answerRepository.save(answer);
        return "Answer added successfully \n" + answerDTO;
    }

    public AnswerDTO updateAnswer(int answerId, AnswerDTO answerDTO){
        Answer answer = answerMapper.apply(answerDTO);
        Answer existingAnswer = answerRepository.findById(answerId).get();
        existingAnswer.setAnswerText(answer.getAnswerText());
        Answer updatedAnswer = answerRepository.save(existingAnswer);
        return answerDTOMapper.apply(updatedAnswer);
    }

    public void deleteAnswer(int answerId){
        Answer answerToDelete = answerRepository.findById(answerId).get();
        answerRepository.delete(answerToDelete);
    }

    public Optional<AnswerDTO> getAnswerByDayAndUser(int questionId, int id){
        Optional<Answer> answer = answerRepository.findByQuestion_QuestionIdAndUser_Id(questionId, id);
        return answer.map(answerDTOMapper);
    }
}