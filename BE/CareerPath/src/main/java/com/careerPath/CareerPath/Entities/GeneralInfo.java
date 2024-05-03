package com.careerPath.CareerPath.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "GeneralInfo")
public class GeneralInfo {
    @Column(name = "info_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int infoId;

    @Column(name = "info_text", nullable = false)
    private String infoText;
}
