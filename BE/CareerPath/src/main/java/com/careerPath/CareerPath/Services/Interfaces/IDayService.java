package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Day;

import java.util.List;

public interface IDayService {
    List<Day> getAllDays();

    Day getDayById(int id);
}
