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
@Table(name = "Answer")
public class Answer {
    @Column(name = "answer_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answerId;

    @Column(name = "question_id", nullable = false)
    private int questionId;

    @Column(name = "answer_text", nullable = false)
    private String answerText;

    @ManyToOne
    @JoinColumn(name = "diary_entry_id", nullable = false, foreignKey = @ForeignKey(name = "FK_diaryentryid_Answers"))
    private DiaryEntry diaryEntryId;
}
