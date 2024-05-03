package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Integer> {
}
