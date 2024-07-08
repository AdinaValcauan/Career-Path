package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
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

    @GetMapping("/getAllParagraphs")
    public List<ParagraphDTO> getAllParagraphs() {
        return paragraphService.getAllParagraphs();
    }

    @PostMapping("/addParagraph")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addParagraph(@RequestBody ParagraphDTO paragraphDTO){
        return paragraphService.addParagraph(paragraphDTO);
    }

    @PutMapping("/updateParagraph/{paragraphId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public ParagraphDTO updateParagraph(@PathVariable int paragraphId, @RequestBody ParagraphDTO paragraphDTO){
        return paragraphService.updateParagraph(paragraphId, paragraphDTO);
    }

    @DeleteMapping(value = "/deleteParagraph/{paragraphId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteParagraph(@PathVariable int paragraphId){
        paragraphService.deleteParagraph(paragraphId);
    }

    @GetMapping("/getParagraphsByDay/{dayId}")
    public List<ParagraphDTO> getParagraphsByDay(@PathVariable int dayId){
        return paragraphService.getParagraphsByDay(dayId);
    }

    @PutMapping("/updateOrderForm/{paragraphId}/{orderForm}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public ParagraphDTO updateOrderForm(@PathVariable int paragraphId, @PathVariable int orderForm){
        return paragraphService.updateOrderForm(paragraphId, orderForm);
    }
}