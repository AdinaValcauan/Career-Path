package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.GeneralInfoDTO;
import com.careerPath.CareerPath.Entities.GeneralInfo;
import com.careerPath.CareerPath.Mappers.GeneralInfoDTOMapper;
import com.careerPath.CareerPath.Mappers.GeneralInfoMapper;
import com.careerPath.CareerPath.Repositories.GeneralInfoRepository;
import com.careerPath.CareerPath.Services.Interfaces.IGeneralInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeneralInfoService implements IGeneralInfoService {
    @Autowired
    private GeneralInfoRepository generalInfoRepository;

    @Autowired
    private GeneralInfoMapper generalInfoMapper;

    @Autowired
    private GeneralInfoDTOMapper generalInfoDTOMapper;

    public GeneralInfoDTO getGeneralInfo(int id) {
        GeneralInfo generalInfo = generalInfoRepository.findById(id).get();
        return generalInfoDTOMapper.apply(generalInfo);
    }

    public GeneralInfoDTO updateGeneralInfo(int id, GeneralInfoDTO newInfoDTO) {
        GeneralInfo newInfo = generalInfoMapper.apply(newInfoDTO);
        GeneralInfo existingInfo = generalInfoRepository.findById(id).get();

        existingInfo.setInfoText(newInfo.getInfoText());
        existingInfo.setType(newInfo.getType());

        GeneralInfo updatedInfo = generalInfoRepository.save(existingInfo);
        return generalInfoDTOMapper.apply(updatedInfo);
    }

    public List<GeneralInfoDTO> getAllGeneralInfo() {
        List<GeneralInfo> generalInfos = generalInfoRepository.findAll();
        return generalInfos.stream()
                .map(generalInfoDTOMapper)
                .collect(Collectors.toList());
    }

    public String addGeneralInfo(GeneralInfoDTO generalInfoDTO) {
        GeneralInfo generalInfo = generalInfoMapper.apply(generalInfoDTO);
        generalInfoRepository.save(generalInfo);
        return "General Info added successfully \n" + generalInfoDTO;
    }

    public void deleteGeneralInfo(int infoId) {
        GeneralInfo generalInfoToDelete = generalInfoRepository.findById(infoId).get();
        generalInfoRepository.delete(generalInfoToDelete);
    }
}
