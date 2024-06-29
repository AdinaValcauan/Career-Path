package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Title;

import java.util.List;

public interface ITitleService {
    List<Title> getAllTitles();
    Title getTitleById(int titleId);
    String addTitle(Title title);
    Title updateTitle(int titleId, Title title);
    void deleteTitle(int titleId);
    List<Title> getTitlesByDay(int dayId);
    Title updateOrderForm(int titleId, int orderForm);
}