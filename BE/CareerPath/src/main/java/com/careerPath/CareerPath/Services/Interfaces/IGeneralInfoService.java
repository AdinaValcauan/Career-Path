package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.GeneralInfo;
import com.careerPath.CareerPath.Entities.Title;

import java.util.List;

public interface IGeneralInfoService {
    GeneralInfo getGeneralInfo(int id);

    GeneralInfo updateGeneralInfo(int infoId, GeneralInfo generalInfo);

    List<GeneralInfo> getAllGeneralInfo();

    String addGeneralInfo(GeneralInfo generalInfo);

    void deleteGeneralInfo(int infoId);
}
