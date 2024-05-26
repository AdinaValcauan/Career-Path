package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.DiaryEntry;
import com.careerPath.CareerPath.Entities.Question;
import com.careerPath.CareerPath.Repositories.DiaryEntryRepository;
import com.careerPath.CareerPath.Services.Interfaces.IDiaryEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DiaryEntryService implements IDiaryEntryService {
    @Autowired
    private DiaryEntryRepository diaryEntryRepository;

    public List<DiaryEntry> getAllDiaryEntries(){
        return diaryEntryRepository.findAll();
    }

    public DiaryEntry getDiaryEntryById(int diaryEntryId) {
        return diaryEntryRepository.findById(diaryEntryId).get();
    }

    public String addDiaryEntry(DiaryEntry diaryEntry){
        diaryEntryRepository.save(diaryEntry);
        return "Question added successfully \n" + diaryEntry;
    }

    public DiaryEntry updateDiaryEntry(int diaryEntryId, DiaryEntry diaryEntry){
        DiaryEntry existingDiaryEntry = diaryEntryRepository.findById(diaryEntryId).get();

        existingDiaryEntry.setEntryDate(diaryEntry.getEntryDate());

        return diaryEntryRepository.save(existingDiaryEntry);
    }

    public void deleteDiaryEntry(int diaryEntryId){
        DiaryEntry diaryEntryToDelete = diaryEntryRepository.findById(diaryEntryId).get();
        diaryEntryRepository.delete(diaryEntryToDelete);
    }
}
