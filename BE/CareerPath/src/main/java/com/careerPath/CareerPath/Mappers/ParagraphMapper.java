package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ParagraphMapper implements Function<ParagraphDTO, Paragraph> {
    private final IDayService dayService;

    @Autowired
    public ParagraphMapper(IDayService dayService) {
        this.dayService = dayService;
    }

    @Override
    public Paragraph apply(ParagraphDTO paragraphDTO) {
        Paragraph paragraph = new Paragraph();
        paragraph.setParagraphId(paragraphDTO.getParagraphId());
        paragraph.setDay(dayService.getDayById(paragraphDTO.getDayId()));
        paragraph.setParagraphText(paragraphDTO.getParagraphText());
        paragraph.setOrderForm(paragraphDTO.getOrderForm());
        return paragraph;
    }
}