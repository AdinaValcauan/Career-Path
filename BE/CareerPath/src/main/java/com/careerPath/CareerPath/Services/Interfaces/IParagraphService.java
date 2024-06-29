package com.careerPath.CareerPath.Services.Interfaces;

import com.careerPath.CareerPath.Entities.Paragraph;

import java.util.List;

public interface IParagraphService {
    List<Paragraph> getAllParagraphs();
    String addParagraph(Paragraph paragraph);
    Paragraph updateParagraph(int paragraphId, Paragraph paragraph);
    void deleteParagraph(int paragraphId);
    List<Paragraph> getParagraphsByDay(int dayId);
    Paragraph updateOrderForm(int paragraphId, int orderForm);
}
