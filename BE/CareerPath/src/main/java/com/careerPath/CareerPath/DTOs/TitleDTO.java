package com.careerPath.CareerPath.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TitleDTO {
    private int titleId;
    private String titleText;
    private int orderForm;
    private int dayId;
}
