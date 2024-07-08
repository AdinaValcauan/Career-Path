package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.DayDTO;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DayController {
    @Autowired
    private IDayService dayService;

    @GetMapping("/dayById/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public DayDTO getDayById(@PathVariable int dayId) {
        return dayService.getDayById(dayId);
    }

    @GetMapping("/getAllDays")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<DayDTO> getAllDays() {
        return dayService.getAllDays();
    }

    @PostMapping("/addDay")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addDay(@RequestBody DayDTO dayDTO){
        return dayService.addDay(dayDTO);
    }

    @PutMapping("/updateDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public DayDTO updateDay(@PathVariable int dayId, @RequestBody DayDTO dayDTO){
        return dayService.updateDay(dayId, dayDTO);
    }

    @DeleteMapping(value = "/deleteDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteDay(@PathVariable int dayId){
        dayService.deleteDay(dayId);
    }
}