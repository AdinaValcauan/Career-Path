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
@Table(name = "Title")
public class Title {
    @Column(name = "title_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int titleId;

    @Column(name = "title_text")
    private String titleText;

    @Column(name = "order")
    private int order;

    @ManyToOne
    @JoinColumn(name = "day_id", nullable = false, foreignKey = @ForeignKey(name = "FK_dayid_Title"))
    private Day day;
}