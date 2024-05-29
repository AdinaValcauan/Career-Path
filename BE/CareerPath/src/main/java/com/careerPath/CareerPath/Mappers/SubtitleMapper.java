package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.Entities.Subtitle;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SubtitleMapper implements Function<SubtitleDTO, Subtitle> {
    private final IDayService dayService;

    @Autowired
    public SubtitleMapper(IDayService dayService) {
        this.dayService = dayService;
    }

    @Override
    public Subtitle apply(SubtitleDTO subtitleDTO) {
        Subtitle subtitle = new Subtitle();
        subtitle.setSubtitleId(subtitleDTO.getSubtitleId());
        subtitle.setDay(dayService.getDayById(subtitleDTO.getDayId()));
        subtitle.setSubtitleText(subtitleDTO.getSubtitleText());
        subtitle.setOrderForm(subtitleDTO.getOrderForm());
        return subtitle;
    }
}