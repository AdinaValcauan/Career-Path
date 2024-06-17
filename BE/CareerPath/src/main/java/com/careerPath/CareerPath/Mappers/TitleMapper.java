package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TitleMapper implements Function<TitleDTO, Title> {
    private final IDayService dayService;

    @Autowired
    public TitleMapper(IDayService dayService) {
        this.dayService = dayService;
    }

    @Override
    public Title apply(TitleDTO titleDTO) {
        Title title = new Title();
        title.setTitleId(titleDTO.getTitleId());
        title.setTitleText(titleDTO.getTitleText());
        title.setOrderForm(titleDTO.getOrderForm());
        title.setDay(dayService.getDayById(titleDTO.getDayId()));
        return title;
    }
}