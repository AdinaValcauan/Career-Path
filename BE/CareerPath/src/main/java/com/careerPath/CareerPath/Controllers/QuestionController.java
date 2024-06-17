package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Mappers.QuestionDTOMapper;
import com.careerPath.CareerPath.Mappers.QuestionMapper;
import com.careerPath.CareerPath.Services.DayService;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {
    @Autowired
    private IQuestionService questionService;

    @Autowired
    private QuestionMapper questionMapper;

    @Autowired
    private QuestionDTOMapper questionDTOMapper;

    @Autowired
    private DayService dayService;

    @GetMapping("/questionById/{questionId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public QuestionDTO getQuestionById(@PathVariable int questionId) {
        Question question = questionService.getQuestionById(questionId);
        return questionDTOMapper.apply(question);
    }

    @GetMapping("/getAllQuestions")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return questions.stream()
                .map(questionDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addQuestion")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addQuestion(@RequestBody QuestionDTO questionDTO){
        Question question = questionMapper.apply(questionDTO);
        Day day = dayService.getDayById(questionDTO.getDayId());
        question.setDay(day);
        return questionService.addQuestion(question);
    }

    @PutMapping("/updateQuestion/{questionId}")
    public QuestionDTO updateQuestion(@PathVariable int questionId, @RequestBody QuestionDTO questionDTO){
        Question question = questionMapper.apply(questionDTO);
        Question updatedQuestion = questionService.updateQuestion(questionId, question);
        return questionDTOMapper.apply(updatedQuestion);
    }

    @DeleteMapping(value = "/deleteQuestion/{questionId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteQuestion(@PathVariable int questionId){
        questionService.deleteQuestion(questionId);
    }

    @GetMapping(value = "/getQuestionsByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<QuestionDTO> getQuestionsByDay(@PathVariable int dayId){
        List<Question> questions = questionService.getQuestionsByDay(dayId);
        return questions.stream()
                .map(questionDTOMapper)
                .collect(Collectors.toList());
    }
}
