package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Paragraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParagraphRepository extends JpaRepository<Paragraph, Integer> {

    List<Paragraph> findByDay_DayIdOrderByOrder(int dayId);
}
