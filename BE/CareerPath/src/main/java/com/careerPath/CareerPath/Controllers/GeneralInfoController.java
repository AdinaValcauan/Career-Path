package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.GeneralInfoDTO;
import com.careerPath.CareerPath.Services.Interfaces.IGeneralInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GeneralInfoController {
    @Autowired
    private IGeneralInfoService generalInfoService;

    @GetMapping("/getInfo/{id}")
    public GeneralInfoDTO getGeneralInfo(@PathVariable int id) {
        return generalInfoService.getGeneralInfo(id);
    }

    @PutMapping("/updateInfo/{id}")
    public GeneralInfoDTO updateGeneralInfo(@PathVariable int id, @RequestBody GeneralInfoDTO newInfoDTO) {
        return generalInfoService.updateGeneralInfo(id, newInfoDTO);
    }

    @GetMapping("/getAllInfo")
    public List<GeneralInfoDTO> getAllGeneralInfo() {
        return generalInfoService.getAllGeneralInfo();
    }

    @PostMapping("/addInfo")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addGeneralInfo(@RequestBody GeneralInfoDTO generalInfoDTO) {
        return generalInfoService.addGeneralInfo(generalInfoDTO);
    }

    @DeleteMapping(value = "/deleteInfo/{infoId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteInfo(@PathVariable int infoId) {
        generalInfoService.deleteGeneralInfo(infoId);
    }
}