package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Entities.Title;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TitleDTOMapper implements Function<Title, TitleDTO> {
    @Override
    public TitleDTO apply(Title title) {
        return new TitleDTO(
                title.getTitleId(),
                title.getTitleText(),
                title.getOrder(),
                title.getDay().getDayId()
        );
    }
}