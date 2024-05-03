package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.GeneralInfoDTO;
import com.careerPath.CareerPath.Entities.GeneralInfo;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class GeneralInfoDTOMapper implements Function<GeneralInfo, GeneralInfoDTO> {
    @Override
    public GeneralInfoDTO apply(GeneralInfo generalInfo) {
        return new GeneralInfoDTO(
                generalInfo.getInfoId(),
                generalInfo.getInfoText()
        );
    }
}