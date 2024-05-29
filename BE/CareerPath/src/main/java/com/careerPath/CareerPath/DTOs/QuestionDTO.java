package com.careerPath.CareerPath.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDTO {
    private int questionId;
    private int dayId;
    private int orderForm;
    private String questionText;
}
