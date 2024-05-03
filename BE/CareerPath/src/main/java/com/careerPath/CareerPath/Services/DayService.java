package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Repositories.DayRepository;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DayService implements IDayService {
    @Autowired
    private DayRepository dayRepository;
    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    public Day getDayById(int id) {
        return dayRepository.findById(id).get();
    }

}
