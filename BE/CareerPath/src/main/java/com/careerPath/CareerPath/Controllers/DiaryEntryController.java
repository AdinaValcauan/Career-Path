package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.Services.Interfaces.IDiaryEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryEntryController {
//    @Autowired
    private IDiaryEntryService diaryEntryService;
}