package com.careerPath.CareerPath.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Entity
@Table(name = "DiaryEntry")
public class DiaryEntry {
    @Column(name = "diary_entry_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int diaryEntryId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_userid_DiaryEntry"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "day_id", nullable = false, foreignKey = @ForeignKey(name = "FK_userid_DiaryEntry"))
    private Day day;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;


    public int getUserId() {
        return this.user.getId();
    }

    public int getDayId() {
        return this.day.getDayId();
    }
}
