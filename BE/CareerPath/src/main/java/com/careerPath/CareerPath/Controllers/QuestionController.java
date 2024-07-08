package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {
    @Autowired
    private IQuestionService questionService;

    @GetMapping("/questionById/{questionId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public QuestionDTO getQuestionById(@PathVariable int questionId) {
        return questionService.getQuestionById(questionId);
    }

    @GetMapping("/getAllQuestions")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<QuestionDTO> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/addQuestion")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addQuestion(@RequestBody QuestionDTO questionDTO){
        return questionService.addQuestion(questionDTO);
    }

    @PutMapping("/updateQuestion/{questionId}")
    public QuestionDTO updateQuestion(@PathVariable int questionId, @RequestBody QuestionDTO questionDTO){
        return questionService.updateQuestion(questionId, questionDTO);
    }

    @DeleteMapping(value = "/deleteQuestion/{questionId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteQuestion(@PathVariable int questionId){
        questionService.deleteQuestion(questionId);
    }

    @GetMapping(value = "/getQuestionsByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<QuestionDTO> getQuestionsByDay(@PathVariable int dayId){
        return questionService.getQuestionsByDay(dayId);
    }

    @PatchMapping("/updateOrderForm/{questionId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public QuestionDTO updateOrderForm(@PathVariable int questionId, @RequestBody int orderForm) {
        return questionService.updateOrderForm(questionId, orderForm);
    }
}