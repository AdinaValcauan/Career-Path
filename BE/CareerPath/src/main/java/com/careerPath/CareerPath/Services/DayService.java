package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Repositories.DayRepository;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DayService implements IDayService {
    @Autowired
    private DayRepository dayRepository;
    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    public Day getDayById(int dayId) {
        return dayRepository.findById(dayId).get();
    }

    public Day updateDay(int dayId, Day day){
        Day existingDay = dayRepository.findById(dayId).get();

        existingDay.setDayText(day.getDayText());
        existingDay.setDayNumber(day.getDayNumber());

        return dayRepository.save(existingDay);
    }

    public void deleteDay(int dayId){
        Day dayToDelete = dayRepository.findById(dayId).get();
        dayRepository.delete(dayToDelete);
    }

    public String addDay(Day day){
        dayRepository.save(day);
        return "Day added successfully \n" + day;
    }
}
