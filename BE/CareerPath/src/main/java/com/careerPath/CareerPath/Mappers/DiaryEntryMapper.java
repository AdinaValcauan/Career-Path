package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.DiaryEntryDTO;
import com.careerPath.CareerPath.Entities.DiaryEntry;
import com.careerPath.CareerPath.Services.Interfaces.IDayService;
import com.careerPath.CareerPath.Services.Interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DiaryEntryMapper implements Function<DiaryEntryDTO, DiaryEntry> {
//    private final IUserService userService;
//    private final IDayService dayService;
//
//    @Autowired
//    public DiaryEntryMapper(IUserService userService, IDayService dayService) {
//        this.userService = userService;
//        this.dayService = dayService;
//    }

    @Override
    public DiaryEntry apply(DiaryEntryDTO diaryEntryDTO) {
        DiaryEntry diaryEntry = new DiaryEntry();
        diaryEntry.setEntryDate(diaryEntryDTO.getEntryDate());
        return diaryEntry;
    }
}