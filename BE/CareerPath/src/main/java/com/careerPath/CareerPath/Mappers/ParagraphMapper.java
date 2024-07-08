package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.Entities.Day;
import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ParagraphMapper implements Function<ParagraphDTO, Paragraph> {
    private final IDayService dayService;
    private final DayMapper dayMapper;

    @Autowired
    public ParagraphMapper(IDayService dayService, DayMapper dayMapper) {
        this.dayService = dayService;
        this.dayMapper = dayMapper;
    }

    @Override
    public Paragraph apply(ParagraphDTO paragraphDTO) {
        Paragraph paragraph = new Paragraph();
        paragraph.setParagraphId(paragraphDTO.getParagraphId());

        Day day = dayMapper.apply(dayService.getDayById(paragraphDTO.getDayId()));
        paragraph.setDay(day);

        paragraph.setParagraphText(paragraphDTO.getParagraphText());
        paragraph.setOrderForm(paragraphDTO.getOrderForm());
        return paragraph;
    }
}