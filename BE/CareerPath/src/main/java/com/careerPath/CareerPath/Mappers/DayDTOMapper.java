package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.DayDTO;
import com.careerPath.CareerPath.Entities.Day;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DayDTOMapper implements Function<Day, DayDTO> {
    @Override
    public DayDTO apply(Day day) {
        return new DayDTO(
                day.getDayId(),
                day.getDayNumber(),
                day.getDayText()
        );
    }
}
