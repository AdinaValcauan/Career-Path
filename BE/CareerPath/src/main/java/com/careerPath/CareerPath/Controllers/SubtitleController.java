package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Subtitle;
import com.careerPath.CareerPath.Mappers.SubtitleDTOMapper;
import com.careerPath.CareerPath.Mappers.SubtitleMapper;
import com.careerPath.CareerPath.Services.DayService;
import com.careerPath.CareerPath.Services.Interfaces.ISubtitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SubtitleController {
    @Autowired
    private ISubtitleService subtitleService;

    @Autowired
    private SubtitleMapper subtitleMapper;

    @Autowired
    private SubtitleDTOMapper subtitleDTOMapper;

    @Autowired
    private DayService dayService;

    @GetMapping("/getAllSubtitles")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<SubtitleDTO> getAllSubtitles() {
        List<Subtitle> subtitle = subtitleService.getAllSubtitles();
        return subtitle.stream()
                .map(subtitleDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addSubtitle")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addSubtitle(@RequestBody SubtitleDTO subtitleDTO){
        Subtitle subtitle = subtitleMapper.apply(subtitleDTO);
        Day day = dayService.getDayById(subtitleDTO.getDayId());
        subtitle.setDay(day);
        return subtitleService.addSubtitle(subtitle);
    }

    @PutMapping("/updateSubtitle/{subtitleId}")
    public SubtitleDTO updateSubtitle(@PathVariable int subtitleId, @RequestBody SubtitleDTO subtitleDTO){
        Subtitle subtitle = subtitleMapper.apply(subtitleDTO);
        Subtitle updatedSubtitle = subtitleService.updateSubtitle(subtitleId, subtitle);
        return subtitleDTOMapper.apply(updatedSubtitle);
    }

    @DeleteMapping(value = "/deleteSubtitle/{subtitleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteSubtitle(@PathVariable int subtitleId){
        subtitleService.deleteSubtitle(subtitleId);
    }

    @GetMapping(value = "/getSubtitlesByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<SubtitleDTO> getSubtitlesByDay(@PathVariable int dayId){
        List<Subtitle> subtitles = subtitleService.getSubtitlesByDay(dayId);
        return subtitles.stream()
                .map(subtitleDTOMapper)
                .collect(Collectors.toList());
    }

    @PatchMapping("/updateOrderForm/{subitleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public SubtitleDTO updateOrderForm(@PathVariable int subtitleId, @RequestBody int orderForm) {
        Subtitle updatedSubtitle = subtitleService.updateOrderForm(subtitleId, orderForm);
        return subtitleDTOMapper.apply(updatedSubtitle);
    }
}
