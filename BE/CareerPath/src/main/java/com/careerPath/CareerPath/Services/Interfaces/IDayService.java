package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.DayDTO;

import java.util.List;

public interface IDayService {
    List<DayDTO> getAllDays();
    DayDTO getDayById(int dayId);
    DayDTO updateDay(int dayId, DayDTO dayDTO);
    void deleteDay(int dayId);
    String addDay(DayDTO dayDTO);
}
