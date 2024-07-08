package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.SubtitleDTO;

import java.util.List;

public interface ISubtitleService {
    List<SubtitleDTO> getAllSubtitles();
    SubtitleDTO getSubtitleById(int subtitleId);
    String addSubtitle(SubtitleDTO subtitleDTO);
    SubtitleDTO updateSubtitle(int subtitleId, SubtitleDTO subtitleDTO);
    void deleteSubtitle(int subtitleId);
    List<SubtitleDTO> getSubtitlesByDay(int dayId);
    SubtitleDTO updateOrderForm(int subtitleId, int orderForm);
}