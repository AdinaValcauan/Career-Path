package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;
import com.careerPath.CareerPath.Entities.Subtitle;
import com.careerPath.CareerPath.Mappers.SubtitleDTOMapper;
import com.careerPath.CareerPath.Mappers.SubtitleMapper;
import com.careerPath.CareerPath.Repositories.SubtitleRepository;
import com.careerPath.CareerPath.Services.Interfaces.ISubtitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SubtitleService implements ISubtitleService {
    @Autowired
    private SubtitleRepository subtitleRepository;

    @Autowired
    private SubtitleMapper subtitleMapper;

    @Autowired
    private SubtitleDTOMapper subtitleDTOMapper;

    public List<SubtitleDTO> getAllSubtitles(){
        List<Subtitle> subtitles = subtitleRepository.findAll();
        return subtitles.stream()
                .map(subtitleDTOMapper)
                .collect(Collectors.toList());
    }

    public SubtitleDTO getSubtitleById(int subtitleId) {
        Subtitle subtitle = subtitleRepository.findById(subtitleId).get();
        return subtitleDTOMapper.apply(subtitle);
    }

    public String addSubtitle(SubtitleDTO subtitleDTO){
        Subtitle subtitle = subtitleMapper.apply(subtitleDTO);
        subtitleRepository.save(subtitle);
        return "Subtitle added successfully \n" + subtitleDTO;
    }

    public SubtitleDTO updateSubtitle(int subtitleId, SubtitleDTO subtitleDTO){
        Subtitle subtitle = subtitleMapper.apply(subtitleDTO);
        Subtitle existingSubtitle = subtitleRepository.findById(subtitleId).get();
        existingSubtitle.setSubtitleText(subtitle.getSubtitleText());

        Subtitle updatedSubtitle = subtitleRepository.save(existingSubtitle);
        return subtitleDTOMapper.apply(updatedSubtitle);
    }

    public void deleteSubtitle(int subtitleId) {
        Subtitle subtitleToDelete = subtitleRepository.findById(subtitleId).get();
        subtitleRepository.delete(subtitleToDelete);
    }

    public List<SubtitleDTO> getSubtitlesByDay(int dayId){
        List<Subtitle> subtitles = subtitleRepository.findByDay_DayIdOrderByOrderForm(dayId);
        return subtitles.stream()
                .map(subtitleDTOMapper)
                .collect(Collectors.toList());
    }

    public SubtitleDTO updateOrderForm(int subtitleId, int orderForm) {
        Subtitle existingSubtitle = subtitleRepository.findById(subtitleId).get();
        existingSubtitle.setOrderForm(orderForm);

        Subtitle updatedSubtitle = subtitleRepository.save(existingSubtitle);
        return subtitleDTOMapper.apply(updatedSubtitle);
    }
}