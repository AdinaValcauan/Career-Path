package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Mappers.TitleDTOMapper;
import com.careerPath.CareerPath.Mappers.TitleMapper;
import com.careerPath.CareerPath.Services.DayService;
import com.careerPath.CareerPath.Services.Interfaces.ITitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TitleController {
    @Autowired
    private ITitleService titleService;

    @Autowired
    private TitleMapper titleMapper;

    @Autowired
    private TitleDTOMapper titleDTOMapper;

    @Autowired
    private DayService dayService;

    @GetMapping("/getAllTitles")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<TitleDTO> getAllTitles() {
        List<Title> titles = titleService.getAllTitles();
        return titles.stream()
                .map(titleDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addTitle")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addTitle(@RequestBody TitleDTO titleDTO) {
        Title title = titleMapper.apply(titleDTO);
        Day day = dayService.getDayById(titleDTO.getDayId());
        title.setDay(day);
        return titleService.addTitle(title);
    }

    @PutMapping("/updateTitle/{titleId}")
    public TitleDTO updateTitle(@PathVariable int titleId, @RequestBody TitleDTO titleDTO) {
        Title title = titleMapper.apply(titleDTO);
        Title updatedTitle = titleService.updateTitle(titleId, title);
        return titleDTOMapper.apply(updatedTitle);
    }

    @DeleteMapping(value = "/deleteTitle/{titleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteTitle(@PathVariable int titleId) {
        titleService.deleteTitle(titleId);
    }

    @GetMapping(value = "/getTitlesByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<TitleDTO> getTitlesByDay(@PathVariable int dayId){
        List<Title> titles = titleService.getTitlesByDay(dayId);
        return titles.stream()
                .map(titleDTOMapper)
                .collect(Collectors.toList());
    }

}