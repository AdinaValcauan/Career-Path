package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.Services.Interfaces.ISubtitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SubtitleController {
    @Autowired
    private ISubtitleService subtitleService;

    @GetMapping("/getAllSubtitles")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<SubtitleDTO> getAllSubtitles() {
        return subtitleService.getAllSubtitles();
    }

    @PostMapping("/addSubtitle")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addSubtitle(@RequestBody SubtitleDTO subtitleDTO){
        return subtitleService.addSubtitle(subtitleDTO);
    }

    @PutMapping("/updateSubtitle/{subtitleId}")
    public SubtitleDTO updateSubtitle(@PathVariable int subtitleId, @RequestBody SubtitleDTO subtitleDTO){
        return subtitleService.updateSubtitle(subtitleId, subtitleDTO);
    }

    @DeleteMapping(value = "/deleteSubtitle/{subtitleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteSubtitle(@PathVariable int subtitleId){
        subtitleService.deleteSubtitle(subtitleId);
    }

    @GetMapping(value = "/getSubtitlesByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<SubtitleDTO> getSubtitlesByDay(@PathVariable int dayId){
        return subtitleService.getSubtitlesByDay(dayId);
    }

    @PatchMapping("/updateOrderForm/{subitleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public SubtitleDTO updateOrderForm(@PathVariable int subtitleId, @RequestBody int orderForm) {
        return subtitleService.updateOrderForm(subtitleId, orderForm);
    }
}