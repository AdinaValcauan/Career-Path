package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.TitleDTO;
import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Mappers.TitleDTOMapper;
import com.careerPath.CareerPath.Mappers.TitleMapper;
import com.careerPath.CareerPath.Repositories.TitleRepository;
import com.careerPath.CareerPath.Services.Interfaces.ITitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TitleService implements ITitleService {
    @Autowired
    private TitleRepository titleRepository;

    @Autowired
    private TitleMapper titleMapper;

    @Autowired
    private TitleDTOMapper titleDTOMapper;

    public List<TitleDTO> getAllTitles(){
        List<Title> titles = titleRepository.findAll();
        return titles.stream()
                .map(titleDTOMapper)
                .collect(Collectors.toList());
    }

    public TitleDTO getTitleById(int titleId) {
        Title title = titleRepository.findById(titleId).get();
        return titleDTOMapper.apply(title);
    }

    public String addTitle(TitleDTO titleDTO){
        Title title = titleMapper.apply(titleDTO);
        titleRepository.save(title);
        return "Title added successfully \n" + titleDTO;
    }

    public TitleDTO updateTitle(int titleId, TitleDTO titleDTO){
        Title title = titleMapper.apply(titleDTO);
        Title existingTitle = titleRepository.findById(titleId).get();
        existingTitle.setTitleText(title.getTitleText());

        Title updatedTitle = titleRepository.save(existingTitle);
        return titleDTOMapper.apply(updatedTitle);
    }

    public void deleteTitle(int titleId) {
        Title titleToDelete = titleRepository.findById(titleId).get();
        titleRepository.delete(titleToDelete);
    }

    public List<TitleDTO> getTitlesByDay(int dayId){
        List<Title> titles = titleRepository.findByDay_DayIdOrderByOrderForm(dayId);
        return titles.stream()
                .map(titleDTOMapper)
                .collect(Collectors.toList());
    }

    public TitleDTO updateOrderForm(int titleId, int orderForm) {
        Title existingTitle = titleRepository.findById(titleId).get();
        existingTitle.setOrderForm(orderForm);

        Title updatedTitle = titleRepository.save(existingTitle);
        return titleDTOMapper.apply(updatedTitle);
    }
}