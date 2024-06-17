package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Mappers.ParagraphDTOMapper;
import com.careerPath.CareerPath.Mappers.ParagraphMapper;
import com.careerPath.CareerPath.Services.DayService;
import com.careerPath.CareerPath.Services.Interfaces.IParagraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ParagraphController {
    @Autowired
    private IParagraphService paragraphService;

    @Autowired
    private ParagraphMapper paragraphMapper;

    @Autowired
    private ParagraphDTOMapper paragraphDTOMapper;

    @Autowired
    private DayService dayService;

    @GetMapping("/getAllParagraphs")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<ParagraphDTO> getAllParagraphs() {
        List<Paragraph> paragraphs = paragraphService.getAllParagraphs();
        return paragraphs.stream()
                .map(paragraphDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addParagraph")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addParagraph(@RequestBody ParagraphDTO paragraphDTO){
        Paragraph paragraph = paragraphMapper.apply(paragraphDTO);
        Day day = dayService.getDayById(paragraphDTO.getDayId());
        paragraph.setDay(day);
        return paragraphService.addParagraph(paragraph);
    }

    @PutMapping("/updateParagraph/{paragraphId}")
    public ParagraphDTO updateParagraph(@PathVariable int paragraphId, @RequestBody ParagraphDTO paragraphDTO){
        Paragraph paragraph = paragraphMapper.apply(paragraphDTO);
        Paragraph updatedParagraph = paragraphService.updateParagraph(paragraphId, paragraph);
        return paragraphDTOMapper.apply(updatedParagraph);
    }

    @DeleteMapping(value = "/deleteParagraph/{paragraphId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteParagraph(@PathVariable int paragraphId){
        paragraphService.deleteParagraph(paragraphId);
    }

    @GetMapping(value = "/getParagraphsByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<ParagraphDTO> getParagraphsByDay(@PathVariable int dayId){
        List<Paragraph> paragraphs = paragraphService.getParagraphsByDay(dayId);
        return paragraphs.stream()
                .map(paragraphDTOMapper)
                .collect(Collectors.toList());
    }
}
