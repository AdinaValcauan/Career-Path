package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.GeneralInfoDTO;
import com.careerPath.CareerPath.Entities.GeneralInfo;
import com.careerPath.CareerPath.Entities.Title;

import java.util.List;

public interface IGeneralInfoService {
    GeneralInfoDTO getGeneralInfo(int id);

    GeneralInfoDTO updateGeneralInfo(int infoId, GeneralInfoDTO generalInfoDTO);

    List<GeneralInfoDTO> getAllGeneralInfo();

    String addGeneralInfo(GeneralInfoDTO generalInfoDTO);

    void deleteGeneralInfo(int infoId);
}
