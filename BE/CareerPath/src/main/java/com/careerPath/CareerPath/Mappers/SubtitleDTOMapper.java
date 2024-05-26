package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.Entities.Subtitle;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SubtitleDTOMapper implements Function<Subtitle, SubtitleDTO> {
    @Override
    public SubtitleDTO apply(Subtitle subtitle) {
        return new SubtitleDTO(
                subtitle.getSubtitleId(),
                subtitle.getSubtitleText(),
                subtitle.getOrder(),
                subtitle.getDay().getDayId()
        );
    }
}