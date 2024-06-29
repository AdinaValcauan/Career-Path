package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Subtitle;

import java.util.List;

public interface ISubtitleService {
    List<Subtitle> getAllSubtitles();
    Subtitle getSubtitleById(int subtitleId);
    String addSubtitle(Subtitle subtitle);
    Subtitle updateSubtitle(int subtitleId, Subtitle subtitle);
    void deleteSubtitle(int subtitleId);
    List<Subtitle> getSubtitlesByDay(int dayId);
    Subtitle updateOrderForm(int subtitleId, int orderForm);
}