package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.GeneralInfoDTO;
import com.careerPath.CareerPath.Entities.GeneralInfo;
import com.careerPath.CareerPath.Mappers.GeneralInfoDTOMapper;
import com.careerPath.CareerPath.Mappers.GeneralInfoMapper;
import com.careerPath.CareerPath.Services.Interfaces.IGeneralInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GeneralInfoController {
    @Autowired
    private IGeneralInfoService generalInfoService;

    @Autowired
    private GeneralInfoMapper generalInfoMapper;

    @Autowired
    private GeneralInfoDTOMapper generalInfoDTOMapper;

    @GetMapping("/getInfo/{id}")
    public GeneralInfoDTO getGeneralInfo(@PathVariable int id) {
        GeneralInfo generalInfo = generalInfoService.getGeneralInfo(id);
        return generalInfoDTOMapper.apply(generalInfo);
    }

    @PutMapping("/updateInfo/{id}")
    public GeneralInfoDTO updateGeneralInfo(@PathVariable int id, @RequestBody GeneralInfoDTO newInfo) {
        GeneralInfo generalInfo = generalInfoMapper.apply(newInfo);
        GeneralInfo updatedInfo = generalInfoService.updateGeneralInfo(id, generalInfo);
        return generalInfoDTOMapper.apply(updatedInfo);
    }

    @GetMapping("/getAllInfo")
    public List<GeneralInfoDTO> getAllGeneralInfo() {
        List<GeneralInfo> generalInfos = generalInfoService.getAllGeneralInfo();
        return generalInfos.stream()
                .map(generalInfoDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addInfo")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addGeneralInfo(@RequestBody GeneralInfoDTO generalInfoDTO) {
        GeneralInfo generalInfo = generalInfoMapper.apply(generalInfoDTO);
        return generalInfoService.addGeneralInfo(generalInfo);
    }

    @DeleteMapping(value = "/deleteInfo/{infoId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteInfo(@PathVariable int infoId) {
        generalInfoService.deleteGeneralInfo(infoId);
    }
}
