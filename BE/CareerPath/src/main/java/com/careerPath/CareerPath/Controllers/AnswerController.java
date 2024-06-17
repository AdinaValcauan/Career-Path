package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.AnswerDTO;
import com.careerPath.CareerPath.Entities.Answer;
import com.careerPath.CareerPath.Mappers.AnswerDTOMapper;
import com.careerPath.CareerPath.Mappers.AnswerMapper;
import com.careerPath.CareerPath.Services.Interfaces.IAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerController {
    @Autowired
    private IAnswerService answerService;

    @Autowired
    private AnswerMapper answerMapper;

    @Autowired
    private AnswerDTOMapper answerDTOMapper;

    @GetMapping("/answerById/{answerId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public AnswerDTO getAnswerById(@PathVariable int answerId) {
        Answer answer = answerService.getAnswerById(answerId);
        return answerDTOMapper.apply(answer);
    }

    @GetMapping("/getAllAnswers")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<AnswerDTO> getAllAnswers() {
        List<Answer> answers = answerService.getAllAnswers();
        return answers.stream()
                .map(answerDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addAnswer")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public String addAnswer(@RequestBody AnswerDTO answerDTO){
        Answer answer = answerMapper.apply(answerDTO);
        return answerService.addAnswer(answer);
    }

    @PutMapping("/updateAnswer/{answerId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public AnswerDTO updateAnswer(@PathVariable int answerId, @RequestBody AnswerDTO answerDTO){
        Answer answer = answerMapper.apply(answerDTO);
        Answer updatedAnswer = answerService.updateAnswer(answerId, answer);
        return answerDTOMapper.apply(updatedAnswer);
    }

    @DeleteMapping(value = "/deleteAnswer/{answerId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteAnswer(@PathVariable int answerId){
        answerService.deleteAnswer(answerId);
    }

    @GetMapping("/getAnswerByQuestionAndUser/{questionId}/{userId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public ResponseEntity<AnswerDTO> getAnswerByQuestionAndUser(@PathVariable int questionId, @PathVariable int userId) {
        Optional<Answer> answer = answerService.getAnswerByDayAndUser(questionId, userId);
        if (answer.isPresent()) {
            return new ResponseEntity<>(answerDTOMapper.apply(answer.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
