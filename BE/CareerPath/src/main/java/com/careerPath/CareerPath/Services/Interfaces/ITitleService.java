package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.TitleDTO;

import java.util.List;

public interface ITitleService {
    List<TitleDTO> getAllTitles();
    TitleDTO getTitleById(int titleId);
    String addTitle(TitleDTO titleDTO);
    TitleDTO updateTitle(int titleId, TitleDTO titleDTO);
    void deleteTitle(int titleId);
    List<TitleDTO> getTitlesByDay(int dayId);
    TitleDTO updateOrderForm(int titleId, int orderForm);
}