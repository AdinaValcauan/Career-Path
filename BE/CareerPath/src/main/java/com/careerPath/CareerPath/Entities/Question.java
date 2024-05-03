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
@Table(name = "Question")
public class Question {
    @Column(name = "question_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;

    @ManyToOne
    @JoinColumn(name = "day_id", nullable = false, foreignKey = @ForeignKey(name = "FK_dayid_Question"))
    private Day day;

    @Column(name = "question_text", nullable = false)
    private String questionText;

//    @OneToMany(mappedBy = "question")
//    private List<Answer> answers;
}
