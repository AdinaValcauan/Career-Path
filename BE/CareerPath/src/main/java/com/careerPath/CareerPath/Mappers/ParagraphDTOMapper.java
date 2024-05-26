package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.Entities.Paragraph;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ParagraphDTOMapper implements Function<Paragraph, ParagraphDTO> {
    @Override
    public ParagraphDTO apply(Paragraph paragraph) {
        return new ParagraphDTO(
                paragraph.getParagraphId(),
                paragraph.getParagraphText(),
                paragraph.getOrder(),
                paragraph.getDay().getDayId()
        );
    }
}