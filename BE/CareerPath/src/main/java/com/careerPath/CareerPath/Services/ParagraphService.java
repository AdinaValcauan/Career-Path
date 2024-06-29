package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Repositories.ParagraphRepository;
import com.careerPath.CareerPath.Services.Interfaces.IParagraphService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ParagraphService implements IParagraphService {
    @Autowired
    private ParagraphRepository paragraphRepository;

    public List<Paragraph> getAllParagraphs(){
        return paragraphRepository.findAll();
    }

    public String addParagraph(Paragraph paragraph){
        paragraphRepository.save(paragraph);
        return "Paragraph added successfully \n" + paragraph;
    }

    public Paragraph updateParagraph(int paragraphId, Paragraph paragraph){
        Paragraph existingParagraph = paragraphRepository.findById(paragraphId).get();
        existingParagraph.setParagraphText(paragraph.getParagraphText());

        return paragraphRepository.save(existingParagraph);
    }

    public void deleteParagraph(int paragraphId) {
        Paragraph paragraphToDelete = paragraphRepository.findById(paragraphId).get();
        paragraphRepository.delete(paragraphToDelete);
    }

    public List<Paragraph> getParagraphsByDay(int dayId){
        return paragraphRepository.findByDay_DayIdOrderByOrderForm(dayId);
    }

    public Paragraph updateOrderForm(int paragraphId, int orderForm) {
        Paragraph existingParagraph = paragraphRepository.findById(paragraphId).get();
        existingParagraph.setOrderForm(orderForm);

        return paragraphRepository.save(existingParagraph);
    }
}
