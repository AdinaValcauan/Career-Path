package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TitleMapper implements Function<TitleDTO, Title> {
    private final IDayService dayService;
    private final DayMapper dayMapper;

    @Autowired
    public TitleMapper(IDayService dayService, DayMapper dayMapper) {
        this.dayService = dayService;
        this.dayMapper = dayMapper;
    }

    @Override
    public Title apply(TitleDTO titleDTO) {
        Title title = new Title();
        title.setTitleId(titleDTO.getTitleId());
        title.setTitleText(titleDTO.getTitleText());
        title.setOrderForm(titleDTO.getOrderForm());

        Day day = dayMapper.apply(dayService.getDayById(titleDTO.getDayId()));
        title.setDay(day);

        return title;
    }
}