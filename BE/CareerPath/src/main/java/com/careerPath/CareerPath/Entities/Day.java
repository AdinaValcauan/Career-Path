package com.careerPath.CareerPath.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Day")
public class Day {
    @Column(name = "day_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dayId;

    @Column(name = "day_number", nullable = false)
    private int dayNumber;

    @Column(name = "day_text")
    private String dayText;

    @OneToMany(mappedBy = "day")
    private List<Question> questions;

    @OneToMany(mappedBy = "day")
    private List<DiaryEntry> diaryEntries;
}
