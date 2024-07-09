package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.DTOs.QuestionDTO;
import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Services.Interfaces.IParagraphService;
import com.careerPath.CareerPath.Services.Interfaces.IQuestionService;
import com.careerPath.CareerPath.Services.Interfaces.ISubtitleService;
import com.careerPath.CareerPath.Services.Interfaces.ITitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderFormController {
    @Autowired
    private ITitleService titleService;

    @Autowired
    private ISubtitleService subtitleService;

    @Autowired
    private IParagraphService paragraphService;

    @Autowired
    private IQuestionService questionService;

    @PatchMapping("/updateOrderForm/{resourceType}/{resourceId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public ResponseEntity<?> updateOrderForm(@PathVariable String resourceType, @PathVariable int resourceId, @RequestBody int orderForm) {
        if (resourceType.equals("title")) {
            TitleDTO updatedTitle = titleService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(updatedTitle);
        } else if (resourceType.equals("subtitle")) {
            SubtitleDTO updatedSubtitle = subtitleService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(updatedSubtitle);
        } else if (resourceType.equals("paragraph")) {
            ParagraphDTO updatedParagraph = paragraphService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(updatedParagraph);
        } else if (resourceType.equals("question")) {
            QuestionDTO updatedQuestion = questionService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.badRequest().body("Invalid resource type");
        }
    }
}