package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Subtitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubtitleRepository extends JpaRepository<Subtitle, Integer> {
    List<Subtitle> findByDay_DayId(int dayId);

    List<Subtitle> findByDay_DayIdOrderByOrderForm(int dayId);
}
