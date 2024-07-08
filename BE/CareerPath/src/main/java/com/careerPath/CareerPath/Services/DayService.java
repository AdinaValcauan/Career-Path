package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.DayDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Mappers.DayDTOMapper;
import com.careerPath.CareerPath.Mappers.DayMapper;
import com.careerPath.CareerPath.Repositories.DayRepository;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DayService implements IDayService {
    @Autowired
    private DayRepository dayRepository;

    @Autowired
    private DayMapper dayMapper;

    @Autowired
    private DayDTOMapper dayDTOMapper;

    public List<DayDTO> getAllDays() {
        Sort sort = Sort.by(Sort.Direction.ASC, "orderDay");
        List<Day> days = dayRepository.findAll(sort);
        return days.stream()
                .map(dayDTOMapper)
                .collect(Collectors.toList());
    }

    public DayDTO getDayById(int dayId) {
        Day day = dayRepository.findById(dayId).get();
        return dayDTOMapper.apply(day);
    }

    public DayDTO updateDay(int dayId, DayDTO dayDTO){
        Day day = dayMapper.apply(dayDTO);
        Day existingDay = dayRepository.findById(dayId).get();

        existingDay.setDayText(day.getDayText());
        existingDay.setDayNumber(day.getDayNumber());
        existingDay.setOrderDay(day.getOrderDay());

        Day updatedDay = dayRepository.save(existingDay);
        return dayDTOMapper.apply(updatedDay);
    }

    public void deleteDay(int dayId){
        Day dayToDelete = dayRepository.findById(dayId).get();
        dayRepository.delete(dayToDelete);
    }

    public String addDay(DayDTO dayDTO){
        Day day = dayMapper.apply(dayDTO);
        dayRepository.save(day);
        return "Day added successfully \n" + dayDTO;
    }
}