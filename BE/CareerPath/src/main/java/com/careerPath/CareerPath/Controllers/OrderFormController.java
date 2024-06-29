package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Entities.Subtitle;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Mappers.ParagraphDTOMapper;
import com.careerPath.CareerPath.Mappers.QuestionDTOMapper;
import com.careerPath.CareerPath.Mappers.SubtitleDTOMapper;
import com.careerPath.CareerPath.Mappers.TitleDTOMapper;
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

    @Autowired
    private TitleDTOMapper titleDTOMapper;

    @Autowired
    private SubtitleDTOMapper subtitleDTOMapper;

    @Autowired
    private ParagraphDTOMapper paragraphDTOMapper;

    @Autowired
    private QuestionDTOMapper questionDTOMapper;

    @PatchMapping("/updateOrderForm/{resourceType}/{resourceId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public ResponseEntity<?> updateOrderForm(@PathVariable String resourceType, @PathVariable int resourceId, @RequestBody int orderForm) {
        if (resourceType.equals("title")) {
            Title updatedTitle = titleService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(titleDTOMapper.apply(updatedTitle));
        } else if (resourceType.equals("subtitle")) {
            Subtitle updatedSubtitle = subtitleService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(subtitleDTOMapper.apply(updatedSubtitle));
        } else if (resourceType.equals("paragraph")) {
            Paragraph updatedParagraph = paragraphService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(paragraphDTOMapper.apply(updatedParagraph));
        } else if (resourceType.equals("question")) {
            Question updatedQuestion = questionService.updateOrderForm(resourceId, orderForm);
            return ResponseEntity.ok(questionDTOMapper.apply(updatedQuestion));
        } else {
            return ResponseEntity.badRequest().body("Invalid resource type");
        }
    }
}