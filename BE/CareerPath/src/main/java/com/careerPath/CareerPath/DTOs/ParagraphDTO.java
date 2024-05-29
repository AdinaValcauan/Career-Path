package com.careerPath.CareerPath.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParagraphDTO {
    private int paragraphId;
    private String paragraphText;
    private int orderForm;
    private int dayId;
}
