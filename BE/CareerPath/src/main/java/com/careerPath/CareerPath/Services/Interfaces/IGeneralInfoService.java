package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.GeneralInfo;

import java.util.List;

public interface IGeneralInfoService {
    GeneralInfo getGeneralInfo(int id);

    GeneralInfo updateGeneralInfo(int id, GeneralInfo generalInfo);

    List<GeneralInfo> getAllGeneralInfo();
}
