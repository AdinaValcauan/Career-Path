package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Mappers.QuestionDTOMapper;
import com.careerPath.CareerPath.Mappers.QuestionMapper;
import com.careerPath.CareerPath.Repositories.QuestionRepository;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class QuestionService implements IQuestionService {
        @Autowired
        private QuestionRepository questionRepository;

        @Autowired
        private QuestionMapper questionMapper;

        @Autowired
        private QuestionDTOMapper questionDTOMapper;

        public List<QuestionDTO> getAllQuestions(){
            List<Question> questions = questionRepository.findAll();
            return questions.stream()
                    .map(questionDTOMapper)
                    .collect(Collectors.toList());
        }

        public QuestionDTO getQuestionById(int questionId) {
            Question question = questionRepository.findById(questionId).get();
            return questionDTOMapper.apply(question);
        }

        public String addQuestion(QuestionDTO questionDTO){
            Question question = questionMapper.apply(questionDTO);
            questionRepository.save(question);
            return "Question added successfully \n" + questionDTO;
        }

        public QuestionDTO updateQuestion(int questionId, QuestionDTO questionDTO){
            Question question = questionMapper.apply(questionDTO);
            Question existingQuestion = questionRepository.findById(questionId).get();
            existingQuestion.setQuestionText(question.getQuestionText());

            Question updatedQuestion = questionRepository.save(existingQuestion);
            return questionDTOMapper.apply(updatedQuestion);
        }

        public void deleteQuestion(int questionId) {
            Question questionToDelete = questionRepository.findById(questionId).get();
            questionRepository.delete(questionToDelete);
        }

        public List<QuestionDTO> getQuestionsByDay(int dayId){
            List<Question> questions = questionRepository.findByDay_DayIdOrderByOrderForm(dayId);
            return questions.stream()
                    .map(questionDTOMapper)
                    .collect(Collectors.toList());
        }

        public QuestionDTO updateOrderForm(int questionId, int orderForm) {
            Question existingQuestion = questionRepository.findById(questionId).get();
            existingQuestion.setOrderForm(orderForm);

            Question updatedQuestion = questionRepository.save(existingQuestion);
            return questionDTOMapper.apply(updatedQuestion);
        }
    }