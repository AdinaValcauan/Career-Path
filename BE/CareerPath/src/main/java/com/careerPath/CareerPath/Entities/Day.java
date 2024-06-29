package com.careerPath.CareerPath.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

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

    @Column(name = "day_text", nullable = false)
    private String dayText;

    @Column(name = "order_day")
    private int orderDay;


    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Title> titles;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Subtitle> subtitles;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Paragraph> paragraphs;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

}
