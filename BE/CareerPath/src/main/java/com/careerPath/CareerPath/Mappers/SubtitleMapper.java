package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Subtitle;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SubtitleMapper implements Function<SubtitleDTO, Subtitle> {
    private final IDayService dayService;
    private final DayMapper dayMapper;

    @Autowired
    public SubtitleMapper(IDayService dayService, DayMapper dayMapper) {
        this.dayService = dayService;
        this.dayMapper = dayMapper;
    }

    @Override
    public Subtitle apply(SubtitleDTO subtitleDTO) {
        Subtitle subtitle = new Subtitle();
        subtitle.setSubtitleId(subtitleDTO.getSubtitleId());
        subtitle.setSubtitleText(subtitleDTO.getSubtitleText());
        subtitle.setOrderForm(subtitleDTO.getOrderForm());

        Day day = dayMapper.apply(dayService.getDayById(subtitleDTO.getDayId()));
        subtitle.setDay(day);

        return subtitle;
    }
}