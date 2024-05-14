package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.DiaryEntry;

import java.util.List;

public interface IDiaryEntryService {
    List<DiaryEntry> getAllDiaryEntries();
    DiaryEntry getDiaryEntryById(int diaryEntryId);
    DiaryEntry updateDiaryEntry(int diaryEntryId, DiaryEntry diaryEntry);
    void deleteDiaryEntry(int diaryEntryId);

}
