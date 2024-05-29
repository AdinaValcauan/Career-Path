package com.careerPath.CareerPath.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubtitleDTO {
    private int subtitleId;
    private String subtitleText;
    private int orderForm;
    private int dayId;
}
