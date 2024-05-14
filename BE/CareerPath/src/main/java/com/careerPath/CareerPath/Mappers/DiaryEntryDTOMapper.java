package com.careerPath.CareerPath.Mappers;

import com.careerPath.CareerPath.DTOs.DiaryEntryDTO;
import com.careerPath.CareerPath.Entities.DiaryEntry;
import org.springframework.stereotype.Service;

import java.util.function.Function;

//@Service
//public class DiaryEntryDTOMapper implements Function<DiaryEntry, DiaryEntryDTO> {
//    @Override
//    public DiaryEntryDTO apply(DiaryEntry diaryEntry) {
//        return new DiaryEntryDTO(
//                diaryEntry.getDiaryEntryId(),
//                diaryEntry.getId(),
//                diaryEntry.get(),
//                diaryEntry.getEntryDate()
//        );
//}