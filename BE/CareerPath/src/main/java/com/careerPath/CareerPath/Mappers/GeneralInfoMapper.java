package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.GeneralInfoDTO;
import com.careerPath.CareerPath.Entities.GeneralInfo;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class GeneralInfoMapper implements Function<GeneralInfoDTO, GeneralInfo> {
    @Override
    public GeneralInfo apply(GeneralInfoDTO generalInfoDTO) {
        GeneralInfo generalInfo = new GeneralInfo();
        generalInfo.setInfoId(generalInfoDTO.getInfoId());
        generalInfo.setInfoText(generalInfoDTO.getInfoText());
        return generalInfo;
    }
}