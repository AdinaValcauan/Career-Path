package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Subtitle;
import com.careerPath.CareerPath.Repositories.SubtitleRepository;
import com.careerPath.CareerPath.Services.Interfaces.ISubtitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SubtitleService implements ISubtitleService {
    @Autowired
    private SubtitleRepository subtitleRepository;

    public List<Subtitle> getAllSubtitles(){
        return subtitleRepository.findAll();
    }

    public Subtitle getSubtitleById(int subtitleId) {
        return subtitleRepository.findById(subtitleId).get();
    }

    public String addSubtitle(Subtitle subtitle){
        subtitleRepository.save(subtitle);
        return "Subtitle added successfully \n" + subtitle;
    }

    public Subtitle updateSubtitle(int subtitleId, Subtitle subtitle){
        Subtitle existingSubtitle = subtitleRepository.findById(subtitleId).get();
        existingSubtitle.setSubtitleText(subtitle.getSubtitleText());

        return subtitleRepository.save(existingSubtitle);
    }

    public void deleteSubtitle(int subtitleId) {
        Subtitle subtitleToDelete = subtitleRepository.findById(subtitleId).get();
        subtitleRepository.delete(subtitleToDelete);
    }

    public List<Subtitle> getSubtitlesByDay(int dayId){
        return subtitleRepository.findByDay_DayIdOrderByOrder(dayId);
    }
}