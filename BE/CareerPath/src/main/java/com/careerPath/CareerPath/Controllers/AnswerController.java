package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Services.Interfaces.IAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerController {
    @Autowired
    private IAnswerService answerService;

    @GetMapping("/answerById/{answerId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public AnswerDTO getAnswerById(@PathVariable int answerId) {
        return answerService.getAnswerById(answerId);
    }

    @GetMapping("/getAllAnswers")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<AnswerDTO> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @PostMapping("/addAnswer")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public String addAnswer(@RequestBody AnswerDTO answerDTO){
        return answerService.addAnswer(answerDTO);
    }

    @PutMapping("/updateAnswer/{answerId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public AnswerDTO updateAnswer(@PathVariable int answerId, @RequestBody AnswerDTO answerDTO){
        return answerService.updateAnswer(answerId, answerDTO);
    }

    @DeleteMapping(value = "/deleteAnswer/{answerId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteAnswer(@PathVariable int answerId){
        answerService.deleteAnswer(answerId);
    }

    @GetMapping("/getAnswerByQuestionAndUser/{questionId}/{userId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public ResponseEntity<AnswerDTO> getAnswerByQuestionAndUser(@PathVariable int questionId, @PathVariable int userId) {
        Optional<AnswerDTO> answerDTO = answerService.getAnswerByDayAndUser(questionId, userId);
        return answerDTO.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
