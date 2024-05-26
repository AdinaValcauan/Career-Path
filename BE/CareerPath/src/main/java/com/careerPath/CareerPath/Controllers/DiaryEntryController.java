package com.careerPath.CareerPath.Controllers;

import com.careerPath.CareerPath.DTOs.DiaryEntryDTO;
import com.careerPath.CareerPath.Entities.DiaryEntry;
import com.careerPath.CareerPath.Mappers.DiaryEntryDTOMapper;
import com.careerPath.CareerPath.Mappers.DiaryEntryMapper;
import com.careerPath.CareerPath.Services.Interfaces.IDiaryEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryEntryController {
    @Autowired
    private IDiaryEntryService diaryEntryService;

    @Autowired
    private DiaryEntryMapper diaryEntryMapper;

    @Autowired
    private DiaryEntryDTOMapper diaryEntryDTOMapper;

    @GetMapping("/DiaryEntryById/{diaryEntryId}")
    @PreAuthorize("hasAnyAuthority('admin','user')")
    public DiaryEntryDTO getDiaryEntryById(@PathVariable int diaryEntryId) {
        DiaryEntry DiaryEntry = diaryEntryService.getDiaryEntryById(diaryEntryId);
        return diaryEntryDTOMapper.apply(DiaryEntry);
    }

    @GetMapping("/getAllDiaryEntrys")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public List<DiaryEntryDTO> getAllDiaryEntries() {
        List<DiaryEntry> DiaryEntries = diaryEntryService.getAllDiaryEntries();
        return DiaryEntries.stream()
                .map(diaryEntryDTOMapper)
                .collect(Collectors.toList());
    }

    @PostMapping("/addDiaryEntry")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String addDiaryEntry(@RequestBody DiaryEntryDTO diaryEntryDTO){
        DiaryEntry diaryEntry = diaryEntryMapper.apply(diaryEntryDTO);
        return diaryEntryService.addDiaryEntry(diaryEntry);
    }

    @PutMapping("/updateDiaryEntry/{DiaryEntryId}")
    public DiaryEntryDTO updateDiaryEntry(@PathVariable int DiaryEntryId, @RequestBody DiaryEntryDTO DiaryEntryDTO){
        DiaryEntry DiaryEntry = diaryEntryMapper.apply(DiaryEntryDTO);
        DiaryEntry updatedDiaryEntry = diaryEntryService.updateDiaryEntry(DiaryEntryId, DiaryEntry);
        return diaryEntryDTOMapper.apply(updatedDiaryEntry);
    }

    @DeleteMapping(value = "/deleteDiaryEntry/{diaryEntryId}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteDiaryEntry(@PathVariable int diaryEntryId){
        diaryEntryService.deleteDiaryEntry(diaryEntryId);
    }

}
