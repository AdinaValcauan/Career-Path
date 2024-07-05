package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.GeneralInfo;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Repositories.GeneralInfoRepository;
import com.careerPath.CareerPath.Services.Interfaces.IGeneralInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class GeneralInfoService implements IGeneralInfoService {
    @Autowired
    private GeneralInfoRepository generalInfoRepository;

    public GeneralInfo getGeneralInfo(int id) {
        return generalInfoRepository.findById(id).orElse(null);
    }

    public GeneralInfo updateGeneralInfo(int infoId, GeneralInfo generalInfo) {
        GeneralInfo existingInfo = generalInfoRepository.findById(infoId).orElse(new GeneralInfo());
        existingInfo.setInfoText(generalInfo.getInfoText());
        return generalInfoRepository.save(existingInfo);
    }

    public List<GeneralInfo> getAllGeneralInfo() {
        return generalInfoRepository.findAll();
    }

    public String addGeneralInfo(GeneralInfo generalInfo){
        generalInfoRepository.save(generalInfo);
        return "Info added successfully \n" + generalInfo;
    }

    public void deleteGeneralInfo(int infoId) {
        Optional<GeneralInfo> generalInfoToDelete = generalInfoRepository.findById(infoId);
        if (generalInfoToDelete.isPresent()){
            generalInfoRepository.delete(generalInfoToDelete.get());
        } else {
            throw new NoSuchElementException("No info found with id: " + infoId);
        }
    }
}
