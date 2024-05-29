package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Title;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TitleRepository extends JpaRepository<Title, Integer> {
    List<Title> findByDay_DayIdOrderByOrderForm(int dayId);
}
