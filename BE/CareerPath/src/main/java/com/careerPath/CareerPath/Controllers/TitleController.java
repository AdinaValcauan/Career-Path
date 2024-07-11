package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Services.Interfaces.ITitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TitleController {
    @Autowired
    private ITitleService titleService;

    @GetMapping("/getAllTitles")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<TitleDTO> getAllTitles() {
        return titleService.getAllTitles();
    }

    @PostMapping("/addTitle")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addTitle(@RequestBody TitleDTO titleDTO){
        return titleService.addTitle(titleDTO);
    }

    @PutMapping("/updateTitle/{titleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public TitleDTO updateTitle(@PathVariable int titleId, @RequestBody TitleDTO titleDTO){
        return titleService.updateTitle(titleId, titleDTO);
    }

    @DeleteMapping(value = "/deleteTitle/{titleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteTitle(@PathVariable int titleId){
        titleService.deleteTitle(titleId);
    }

    @GetMapping(value = "/getTitlesByDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<TitleDTO> getTitlesByDay(@PathVariable int dayId){
        return titleService.getTitlesByDay(dayId);
    }

    @PatchMapping("/updateOrderForm/{titleId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public TitleDTO updateOrderForm(@PathVariable int titleId, @RequestBody int orderForm) {
        return titleService.updateOrderForm(titleId, orderForm);
    }
}