package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.GeneralInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralInfoRepository extends JpaRepository<GeneralInfo, Integer> {
}
