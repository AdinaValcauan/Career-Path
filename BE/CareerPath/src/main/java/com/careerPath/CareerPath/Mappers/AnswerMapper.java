package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Entities.Answer;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AnswerMapper implements Function<AnswerDTO, Answer> {
    @Override
    public Answer apply(AnswerDTO answerDTO) {
        Answer answer = new Answer();
        answer.setAnswerId(answerDTO.getAnswerId());
        answer.setQuestionId(answerDTO.getQuestionId());
        answer.setAnswerText(answerDTO.getAnswerText());
        // The diaryEntryId field is not set here as it's not present in AnswerDTO
        return answer;
    }
}