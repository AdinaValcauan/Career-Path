package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Title;
import com.careerPath.CareerPath.Repositories.TitleRepository;
import com.careerPath.CareerPath.Services.Interfaces.ITitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TitleService implements ITitleService {
    @Autowired
    private TitleRepository titleRepository;

    public List<Title> getAllTitles(){
        return titleRepository.findAll();
    }

    public Title getTitleById(int titleId) {
        return titleRepository.findById(titleId).get();
    }

    public String addTitle(Title title){
        titleRepository.save(title);
        return "Title added successfully \n" + title;
    }

    public Title updateTitle(int titleId, Title title){
        Title existingTitle = titleRepository.findById(titleId).get();
        existingTitle.setTitleText(title.getTitleText());
        existingTitle.setOrderForm(title.getOrderForm());

        return titleRepository.save(existingTitle);
    }

    public void deleteTitle(int titleId) {
        Title titleToDelete = titleRepository.findById(titleId).get();
        titleRepository.delete(titleToDelete);
    }

    public List<Title> getTitlesByDay(int dayId){
        return titleRepository.findByDay_DayIdOrderByOrderForm(dayId);
    }
}