package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayRepository extends JpaRepository<Day, Integer> {
}
