package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;

import java.util.List;

public interface IParagraphService {
    List<ParagraphDTO> getAllParagraphs();
    String addParagraph(ParagraphDTO paragraphDTO);
    ParagraphDTO updateParagraph(int paragraphId, ParagraphDTO paragraphDTO);
    void deleteParagraph(int paragraphId);
    List<ParagraphDTO> getParagraphsByDay(int dayId);
    ParagraphDTO updateOrderForm(int paragraphId, int orderForm);
}
