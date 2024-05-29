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
@Table(name = "Paragraph")
public class Paragraph {
    @Column(name = "paragraph_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paragraphId;

    @Column(name = "paragraph_text")
    private String paragraphText;

    @Column(name = "order_form")
    private int orderForm;

    @ManyToOne
    @JoinColumn(name = "day_id", nullable = false, foreignKey = @ForeignKey(name = "FK_dayid_Paragraph"))
    private Day day;
}