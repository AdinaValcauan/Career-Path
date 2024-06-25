package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.DayDTO;
import com.careerPath.CareerPath.Entities.Day;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DayMapper implements Function<DayDTO, Day> {
    @Override
    public Day apply(DayDTO dayDTO) {
        Day day = new Day();
        day.setDayId(dayDTO.getDayId());
        day.setDayNumber(dayDTO.getDayNumber());
        day.setDayText(dayDTO.getDayText());
        day.setOrderDay(dayDTO.getOrderDay());
        return day;
    }

}