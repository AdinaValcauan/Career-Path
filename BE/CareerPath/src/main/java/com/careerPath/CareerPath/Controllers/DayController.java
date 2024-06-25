package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.DayDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Mappers.DayDTOMapper;
import com.careerPath.CareerPath.Mappers.DayMapper;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DayController {
    @Autowired
    private IDayService dayService;

    @Autowired
    private DayMapper dayMapper;

    @Autowired
    private DayDTOMapper dayDTOMapper;

    @GetMapping("/dayById/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public DayDTO getDayById(@PathVariable int dayId) {
        Day day = dayService.getDayById(dayId);
        return dayDTOMapper.apply(day);
    }

    @GetMapping("/getAllDays")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<DayDTO> getAllDays() {
        List<Day> days = dayService.getAllDays();
        return days.stream()
                .map(dayDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addDay")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addDay(@RequestBody DayDTO dayDTO){
        Day day = dayMapper.apply(dayDTO);
        return dayService.addDay(day);
    }

    @PutMapping("/updateDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public DayDTO updateDay(@PathVariable int dayId, @RequestBody DayDTO dayDTO){
            Day day = dayService.getDayById(dayId);
            day.setDayNumber(dayDTO.getDayNumber());
            day.setDayText(dayDTO.getDayText());
            day.setOrderDay(dayDTO.getOrderDay());
            Day updatedDay = dayService.updateDay(dayId, day);
            return dayDTOMapper.apply(updatedDay);
    }

    @DeleteMapping(value = "/deleteDay/{dayId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteDay(@PathVariable int dayId){
        dayService.deleteDay(dayId);
    }

}
