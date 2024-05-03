package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.GeneralInfo;
import com.careerPath.CareerPath.Repositories.GeneralInfoRepository;
import com.careerPath.CareerPath.Services.Interfaces.IGeneralInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneralInfoService implements IGeneralInfoService {
    @Autowired
    private GeneralInfoRepository generalInfoRepository;

    public GeneralInfo getGeneralInfo(int id) {
        return generalInfoRepository.findById(id).orElse(null);
    }

    public GeneralInfo updateGeneralInfo(int id, GeneralInfo generalInfo) {
        GeneralInfo existingInfo = generalInfoRepository.findById(id).orElse(new GeneralInfo());
        existingInfo.setInfoText(generalInfo.getInfoText());
        return generalInfoRepository.save(existingInfo);
    }

    public List<GeneralInfo> getAllGeneralInfo() {
        return generalInfoRepository.findAll();
    }
}
