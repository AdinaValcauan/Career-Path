package com.careerPath.CareerPath.Services;

import com.careerPath.CareerPath.DTOs.ParagraphDTO;
import com.careerPath.CareerPath.Entities.Paragraph;
import com.careerPath.CareerPath.Mappers.ParagraphDTOMapper;
import com.careerPath.CareerPath.Mappers.ParagraphMapper;
import com.careerPath.CareerPath.Repositories.ParagraphRepository;
import com.careerPath.CareerPath.Services.Interfaces.IParagraphService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ParagraphService implements IParagraphService {
    @Autowired
    private ParagraphRepository paragraphRepository;

    @Autowired
    private ParagraphMapper paragraphMapper;

    @Autowired
    private ParagraphDTOMapper paragraphDTOMapper;

    public List<ParagraphDTO> getAllParagraphs(){
        List<Paragraph> paragraphs = paragraphRepository.findAll();
        return paragraphs.stream()
                .map(paragraphDTOMapper)
                .collect(Collectors.toList());
    }

    public String addParagraph(ParagraphDTO paragraphDTO){
        Paragraph paragraph = paragraphMapper.apply(paragraphDTO);
        paragraphRepository.save(paragraph);
        return "Paragraph added successfully \n" + paragraphDTO;
    }

    public ParagraphDTO updateParagraph(int paragraphId, ParagraphDTO paragraphDTO){
        Paragraph paragraph = paragraphMapper.apply(paragraphDTO);
        Paragraph existingParagraph = paragraphRepository.findById(paragraphId).get();
        existingParagraph.setParagraphText(paragraph.getParagraphText());

        Paragraph updatedParagraph = paragraphRepository.save(existingParagraph);
        return paragraphDTOMapper.apply(updatedParagraph);
    }

    public void deleteParagraph(int paragraphId) {
        Paragraph paragraphToDelete = paragraphRepository.findById(paragraphId).get();
        paragraphRepository.delete(paragraphToDelete);
    }

    public List<ParagraphDTO> getParagraphsByDay(int dayId){
        List<Paragraph> paragraphs = paragraphRepository.findByDay_DayIdOrderByOrderForm(dayId);
        return paragraphs.stream()
                .map(paragraphDTOMapper)
                .collect(Collectors.toList());
    }

    public ParagraphDTO updateOrderForm(int paragraphId, int orderForm) {
        Paragraph existingParagraph = paragraphRepository.findById(paragraphId).get();
        existingParagraph.setOrderForm(orderForm);

        Paragraph updatedParagraph = paragraphRepository.save(existingParagraph);
        return paragraphDTOMapper.apply(updatedParagraph);
    }
}